function uiDataFromVennData(vennData) {
    const setMemberToIncludes = []
    var defaultSetsDisplayOptions = {}
    var allEnabledSetsDisplayOptions = {}
    const geneSelectElementInfos = []   // use to create gene checkboxes
    const tmbSelectElementInfos = []    // use to create tmb checkboxes

    let genesAdded = 0
    vennData.setData.geneData.forEach(item => {
        const prefix = item.set[0]
        const includeString = `include_${prefix}`
        setMemberToIncludes.push([prefix, includeString])
        geneSelectElementInfos.push({id: includeString, label: label})
        genesAdded++

        const setIncludeDefault = Boolean(genesAdded > 3)
        try {
            defaultSetsDisplayOptions[includeString] = setIncludeDefault
            allEnabledSetsDisplayOptions[includeString] = true
        } catch (err) {}

    })

    let tmbsAdded = 0
    vennData.setData.tmbData.forEach(item => {
        const prefix = item.set[0]
        const includeString = `include_${prefix}`
        setMemberToIncludes.push([prefix, includeString])
        tmbSelectElementInfos.push({id: includeString, label: label})
        tmbsAdded++

        const setIncludeDefault = Boolean(tmbsAdded > 3)
        try {
            defaultSetsDisplayOptions[includeString] = setIncludeDefault
            allEnabledSetsDisplayOptions[includeString] = true
        } catch (err) {}

    })

    return {
        setMemberToIncludes,
        defaultSetsDisplayOptions,
        allEnabledSetsDisplayOptions,
        geneSelectElementInfos,
        tmbSelectElementInfos
    }
}