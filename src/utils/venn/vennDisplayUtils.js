var defaultSetsDisplayOptions = {
    includeHighPositive: true,
    includeModeratePositive: true,
    includeLowPositive: false,
    includeNegative: true,
    includeTmbHighHigh: true,
    includeTmbHigh: false,
    includeTmbMid: false,
    includeTmbLow: false
}

function updateSetMemberToIncludes (arr) {
    setMemberToIncludes = arr
}

function updateDefaultSetsDisplayOptions(obj) {
    defaultSetsDisplayOptions = obj
}

function displayOptsValueOf(displayOpts, value, setMemberToIncludes) {
    const lookup = setMemberToIncludes.find( function (item) {
        return item[0] == value
    })
    if (!lookup) {return null}
    return displayOpts[lookup[1]]
}

function includeSetContainer(displayOpts, setContainer, setMemberToIncludes) {
    const setLen = setContainer.sets.length
    const lhs = displayOptsValueOf(displayOpts, setContainer.sets[0], setMemberToIncludes)
    const rhs = setLen === 1 ? true : displayOptsValueOf(displayOpts, setContainer.sets[1], setMemberToIncludes)
    return lhs && rhs 
}

function capCase(text) {
    var arr = text.replace(/_/g, ' ').split(' ')
    var rsltArray = []
    for (var i = 0; i < arr.length; i++ ) {
        const word = arr[i]
        const capWord = word === 'GT' ? '>' : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        rsltArray.push(capWord)
    }
    return rsltArray.join(' ')
}
function labelTextForSetContainer(setsArray) {
    if (setsArray.length > 1) {
        return ''
    } else {
        return capCase(setsArray[0])
    }
}

// creates a single D3 "sets" object
function createSetContainer(setsArray, size, itemLabel) {
    let result = { 
        sets: setsArray, 
        size: size,
        defaultSize: size,
        label: itemLabel
    }
    return result
}

// returns an updated D3 "sets" container with size set dependent on config
function updateSetContainerSize(displayOpts, setContainer, setMemberToIncludes) {
    const useDefaultSize = includeSetContainer(displayOpts, setContainer, setMemberToIncludes)
    const setSizeTo = useDefaultSize ? setContainer.defaultSize : 0
    let result = { 
        sets: setContainer.sets,
        size: setSizeTo,
        defaultSize: setContainer.defaultSize
    }
    if (setContainer.sets.length === 1) {
        const labelText = setContainer.label
        result.label = labelText
    }
    return result
}

function applyDisplayOptionsToAllSets(displayOpts, allSets, setMemberToIncludes) {
    const result = allSets.map( (setContainer) => {
        if (setContainer.defaultSize === 0) {
            return setContainer
        }

        const isDefaultSize = setContainer.size === setContainer.defaultSize
        const shouldInclude = includeSetContainer(displayOpts, setContainer, setMemberToIncludes)
        if (shouldInclude){
            if (!isDefaultSize) {
                setContainer.size = setContainer.defaultSize
            }
        } else {
            if (setContainer.size != 0) {
                setContainer.size = 0
            }
        }
        return setContainer
    })
    return result
}

function pushNewSetContainer(pushTo, displayOpts, setsArray, size, setMemberToIncludes, itemLabel){
    const obj = updateSetContainerSize(
        displayOpts,
        createSetContainer(setsArray, size, itemLabel),
        setMemberToIncludes
    )
    pushTo.push(obj)
}
