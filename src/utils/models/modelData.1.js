

function modelData() {
    return new Promise(function(resolve, reject) {
        const result = {
                availableGenes:  [ 
                    [ 0, 'KRAS' ],
                    [ 1, 'BRAF' ],
                    [ 2, 'PTEN' ],
                    [ 3, 'STK11' ],
                    [ 4, 'EGFR' ] ],
                availableTmbThresholds:  [ 
                    [ 0, 0 ], 
                    [ 1, 6 ], 
                    [ 2, 12 ], 
                    [ 3, 18 ] ],
                tmbRangeCount:  5,
                tmbRangeLabels: [ 
                    [ 0, '>= 0 n <= 0' ],
                    [ 1, '> 0 n <= 6' ],
                    [ 2, '> 6 n <= 12' ],
                    [ 3, '> 12 n <= 18' ],
                    [ 4, '> 18 n <= 1.7976931348623157e+308' ] ],
                modelTmbRangeSpecimenCounts: [ 
                    [ 0, 3496 ],
                    [ 1, 12914 ],
                    [ 2, 8303 ],
                    [ 3, 4280 ],
                    [ 4, 4570 ] ],
                geneTmbRangeCount: [ 
                    [ 0, 0, 859 ],
                    [ 0, 1, 3591 ],
                    [ 0, 2, 3476 ],
                    [ 0, 3, 1902 ],
                    [ 0, 4, 1507 ],
                    [ 1, 0, 215 ],
                    [ 1, 1, 820 ],
                    [ 1, 2, 654 ],
                    [ 1, 3, 361 ],
                    [ 1, 4, 600 ],
                    [ 2, 0, 82 ],
                    [ 2, 1, 676 ],
                    [ 2, 2, 637 ],
                    [ 2, 3, 332 ],
                    [ 2, 4, 393 ],
                    [ 3, 0, 162 ],
                    [ 3, 1, 1817 ],
                    [ 3, 2, 2122 ],
                    [ 3, 3, 993 ],
                    [ 3, 4, 1026 ],
                    [ 4, 0, 1264 ],
                    [ 4, 1, 5393 ],
                    [ 4, 2, 1644 ],
                    [ 4, 3, 617 ],
                    [ 4, 4, 896 ] ]
            }
            resolve(result)
        })
}
