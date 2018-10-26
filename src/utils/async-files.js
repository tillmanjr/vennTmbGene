'use strict;'

const {readFile} = require('fs')
const readline = require('readline')

function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    })
}

  module.exports = {
    readFileAsync
  }