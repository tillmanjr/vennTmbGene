function areaDisjunctionSubscriber(disjunctions) {
    if (disjunctions && disjunctions.length > 0) {
        console.log('Area Disjunction received: ', disjunctions)
        if (areaNameLabelMap && areaNameLabelMap.areas.length > 0) {
            const labeledIntersects = disjunctions.map(areaPair => {
                const lhsIdx = areaNameLabelMap.areas.indexOf(areaPair[0])
                const rhsIdx = areaNameLabelMap.areas.indexOf(areaPair[1])
                const lhs = areaNameLabelMap.labels[lhsIdx]
                const rhs = areaNameLabelMap.labels[rhsIdx]
                addDisjunctionToWidget(lhs, rhs)
                console.log(`The intersection of ${lhs} and ${rhs} is misrepresented.`)
            })
        }
    }
}

function addDisjunctionToWidget(lhs, rhs) {
    const content = getRenderIssuesContent()
    const child = `<a href="#"><span style="display:inline-block">${lhs}</span><span style="display:inline-block"> - </span><span style="display:inline-block">${rhs}</span></a>`
    content.innerHTML += child
    setHasErrors()
}

function clearActiveDisjunctions() {
    activeDisjunctions = []
    const content = getRenderIssuesContent()
    content.innerHTML = '';
    setNoErrors();
}

function setHasErrors(){
    const widget = getRenderIssuesWidget()
    widget.classList.remove('no-errors')
    widget.classList.remove('has-errors')
    widget.className += ' has-errors'
    const btn = document.getElementsByClassName('venndropbtn')[0]
    btn.innerHTML = 'Errors in Diagram!'
}

function setNoErrors(){
    const widget = getRenderIssuesWidget()
    widget.classList.remove('no-errors')
    widget.classList.remove('has-errors')
    widget.className += ' no-errors'
    const btn = document.getElementsByClassName('venndropbtn')[0]
    btn.innerHTML = 'Looks Good'
}

function getRenderIssuesWidget() {
    return document.getElementById('renderIssuesWidget') 
}


function getRenderIssuesContent() {
    const widget = getRenderIssuesWidget()
    const children = widget.children
    let content = null;
    for (const value of children) {
        if (value.className === 'venndropdown-content') {
            content = value;
            break;
        }    
    }
    return content
}

function getSetIntersections() {
    areas = d3.selectAll(".venn_area").nodes().map(
        function (element) {
            return {
                sets: element.id.split(","),
                size: parseFloat(element.value)
            };
        });
    return areas;
}

function bindMouseToVenn() {
    diag = d3.selectAll("#diagram")

    diag.selectAll("g")
        .on("mouseover", function (d, i) {
            // slightly darken the area
            var node = d3.select(this).transition();
            node.select("path").style("fill-opacity", 0.25);

            // sort all the areas relative to the current item
            venn.sortAreas(diag, d);

            // Display a tooltip with the current size
            tooltip.transition().duration(400).style("opacity", .9);
            tooltip.text(d.size + " specimens");

            // highlight the current path
            var selection = d3.select(this).transition("tooltip").duration(400);
        })

        .on("mousemove", function () {
            tooltip.style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })

        .on("mouseout", function (d, i) {
            tooltip.transition().duration(400).style("opacity", 0);
            var selection = d3.select(this).transition("tooltip").duration(400);

            var node = d3.select(this).transition();
            node.select("path").style("fill-opacity", 0.15);
        });

}

function redrawVenn() {

    var colours = d3.schemeCategory10;

    var areas = d3.selectAll("#diagram g")

    areas.select("path")
        .filter(function (d) {
            return d.sets.length == 1;
        })
        .style("fill-opacity", .15)
        .style("stroke-width", 5)
        .style("stroke-opacity", 0.50)
        .style("fill", function (d, i) {
            return colours[i];
        })
        .style("stroke", function (d, i) {
            return colours[i];
        });


    areas.select("text").style("fill", "#444")
        .style("font-family", "Shadows Into Light")
        .style("font-size", "18px");

    var defs = d3.select("#diagram svg").append("defs");

    var filter = defs.append("filter")
        .attr("id", "dropshadowfilter")

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 4)
        .attr("result", "blur");

    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 5)
        .attr("dy", 5)
        .attr("result", "offsetBlur");


    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")

    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    areas.attr("filter", "url(#dropshadowfilter)");

}

function uiMappingsFromVennData(vennData) {
    return uiDataFromVennData(vennData)
}

function generateVennDiagram(data) {
    var vennData = vennDataFromModel(data)
    var uiMappings = uiMappingsFromVennData(vennData)

    this.setMemberToIncludes = uiMappings.setMemberToIncludes
    this.setsDisplayOptions = uiMappings.allEnabledSetsDisplayOptions

    this.vennSets = initSets(this.setsDisplayOptions, vennData, uiMappings)

    d3.selectAll("#vennDisplayOptionsTable input").on("change", function () {
        clearActiveDisjunctions()
        draw(this)
    });

    const uncheckElements = document.getElementsByClassName('default_unchecked')
    var i;
    console.log('uncheckElements', uncheckElements)
    for (i = 0; i < uncheckElements.length; i++) {
        uncheckElements[i].click()
    }
    clearActiveDisjunctions()
}

function initSets(displayOpts, vennData, uiMappings) {
    const result = []

    const setMemberToIncludes = uiMappings.setMemberToIncludes
    const setData = vennData.setData

    const areas = []
    const labels = [];


    setData.geneData.forEach(item => {
        console.log(`${item.set} :: ${item.value}`)
        if (item.value > 0) {
            pushNewSetContainer(result, displayOpts, item.set, item.value, setMemberToIncludes, item.label)
            areas.push(item.set[0])
            labels.push(item.label)
        }
    })

    setData.tmbData.forEach(item => {
        console.log(`${item.set} :: ${item.value}`)
        if (item.value > 0) {
            pushNewSetContainer(result, displayOpts, item.set, item.value, setMemberToIncludes, item.label)
            areas.push(item.set[0])
            labels.push(item.label)
        }
    })

    areaNameLabelMap = {
        areas,
        labels
    };

    setData.geneTmbData.forEach(item => {
        console.log(`${item.set} :: ${item.value}`)
        if (item.value > 0) {
            pushNewSetContainer(result, displayOpts, item.set, item.value, setMemberToIncludes, item.label)
        }
    })

    d3.select("#diagram").datum(result);
    d3.select("#diagram").call(chart);
    try {
        const disjunctions = chart.areaDisjunctions()
        areaDisjunctionSubscriber(disjunctions)
    } catch (err) {
        console.error('except attempting chart.areaDisjunctions', err)
    }
    redrawVenn()
    bindMouseToVenn()
    return result
}

function draw(src) {
    const srcId = src.id
    const srcChecked = src.checked
    const optionValue = setsDisplayOptions[srcId]
    const updateNeeded = optionValue !== srcChecked
    if (updateNeeded) {
        setsDisplayOptions[srcId] = srcChecked
        clearActiveDisjunctions()
        vennSets = applyDisplayOptionsToAllSets(setsDisplayOptions, vennSets, setMemberToIncludes)
        d3.select("#diagram").datum(vennSets).call(chart)
        try {
            var disj = chart.areaDisjunctions()
            areaDisjunctionSubscriber(disj)
        } catch (err) {
            console.error('except attempting chart.areaDisjunctions', err)
        }
        redrawVenn()
        bindMouseToVenn()
    }
}

var setsDisplayOptions = {}
var setMemberToIncludes = []
var areaNameLabelMap = {}
var vennSets = {}
var chart = {}
var activeDisjunctions = []

var tooltip = d3.select("body").append("div")
    .attr("class", "venntooltip");

function _initChart(height, width) {
    chart = venn.VennDiagram()
        .width(width)
        .height(height)
}
function createVennDiagram(
    data,
    options = {width: 1000, height: 600}
) {
    const width = options.width
    const height = options.height
    _initChart(height, width)

    if (data) {
        generateVennDiagram(data)
    } else {
        modelData().then(data => {
            generateVennDiagram(data)
        })
    }
}