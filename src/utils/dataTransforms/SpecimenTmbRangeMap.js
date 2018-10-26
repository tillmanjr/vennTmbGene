var HashTable = require('hashtable');

/**
 * @fileoverview HashTable for mapping SpecimenID to TMB Range
 */


//  const specimenTmbRangeMap = (initialSize) => {
//     this.table = initialSize ? 
//                     new HashTable(initialSize) :
//                     new HashTable()

//     this._add = (specimenId, tmbRange) => {
//         this.table.put(specimenId, tmbRange)
//     }

//     this._getTmbRange = (specimenId) => this.table.get(specimenId)

//     this._getLength = () => this.table.size()

//     this._removeSpecimen = (specimenId) => this.table.remove(specimenId)

//     this._getSpecimenIds = () => this.table.keys()

//     return {
//        addSpecimenTmbRange: (specimenId, tmbRange) => this._add(specimenId, tmbRange),
//        getTmbRange: (specimenId) => this._getTmbRange(specimenId),
//        length: () => this._getLength(),
//        removeSpecimen: (specimenId) => this._removeSpecimen(specimenId),
//        getSpecimenIds: () => this._getSpecimenIds()
//     }
//  }

const specimenTmbRangeMap = (initialSize) => {
    this.table = initialSize ? 
                    new HashTable(initialSize) :
                    new HashTable()

    this._add = (specimenId, tmbRange) => {
        this.table.put(specimenId, tmbRange)
    }

    this._getTmbRange = (specimenId) => this.table.get(specimenId)

    this._getLength = () => this.table.size()

    this._removeSpecimen = (specimenId) => this.table.remove(specimenId)

    this._getSpecimenIds = () => this.table.keys()

    return {
       addSpecimenTmbRange: (specimenId, tmbRange) => this._add(specimenId, tmbRange),
       getTmbRange: (specimenId) => this._getTmbRange(specimenId),
       length: () => this._getLength(),
       removeSpecimen: (specimenId) => this._removeSpecimen(specimenId),
       getSpecimenIds: () => this._getSpecimenIds()
    }
 }

 module.exports = {
    specimenTmbRangeMap
 }