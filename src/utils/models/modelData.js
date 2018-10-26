function modelData() {
    return new Promise(function (resolve, reject) {
        const result = {
            availableGenes: [
                [0, 'KRAS'],
                [1, 'BRAF'],
                [2, 'PTEN'],
                [3, 'STK11'],
                [4, 'EGFR']
            ],
            availableTmbThresholds: [
                [0, 6],
                [1, 20]
            ],
            tmbRangeCount: 3,
            tmbRangeLabels: 
            [
                [0, '>= -9007199254740991 n <= 6'],
                [1, '> 6 n < 20'],
                [2, '>= 20 n <= 9007199254740991']
            ],
            modelTmbRangeSpecimenCounts: [
                [0, 16410],
                [1, 12958],
                [2, 4195]
            ],
            geneTmbRangeCount: [
                [0, 0, 4450],
                [0, 1, 5534],
                [0, 2, 1351],
                [1, 0, 1035],
                [1, 1, 1048],
                [1, 2, 567],
                [2, 0, 758],
                [2, 1, 1000],
                [2, 2, 362],
                [3, 0, 1979],
                [3, 1, 3203],
                [3, 2, 938],
                [4, 0, 6657],
                [4, 1, 2314],
                [4, 2, 843]
            ]
        }
        resolve(result)
    })
}