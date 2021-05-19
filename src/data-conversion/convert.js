// node src/data-conversion/convert.js

const fs = require('fs')

const fromFile = 'src/data-conversion/netflix.json'
const toFile = 'src/data-conversion/netflix-array.json'

// Reading the json file
const dataBuffer = fs.readFileSync(fromFile)
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)

const dataLen = Object.keys(data).length

fs.writeFileSync(toFile, "[")

data.forEach((movie, index) => {
    // Converting the specified fields into arrays
    var castArray = movie.cast.split(", ")
    var listedInArray = movie.listed_in.split(", ")

    // Modifying the movie object
    movie.cast = castArray
    movie.listed_in = listedInArray

    // Writing each object into a new file
    var stringifiedJSON = JSON.stringify(movie)
    fs.appendFileSync(toFile, stringifiedJSON)
    
    // We append a comma between objects, except when it's the last object
    if(index != dataLen - 1){
        fs.appendFileSync(toFile, ",")
    }
});

fs.appendFileSync(toFile, "]")