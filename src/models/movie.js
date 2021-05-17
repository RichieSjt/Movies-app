const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    show_id: String,
    type: String,
    title: String,
    director: String,
    cast: String,
    country: String,
    date_added: String,
    release_year: String,
    rating: String,
    duration: String,
    listed_in: String,
    description: String
})

const Movie = mongoose.model('title', movieSchema)

module.exports = Movie