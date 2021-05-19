const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    show_id: String,
    type: String,
    title: String,
    director: String,
    cast: Array,
    country: String,
    date_added: String,
    release_year: Number,
    rating: String,
    duration: String,
    listed_in: Array,
    description: String
})

const Movie = mongoose.model('title', movieSchema)

module.exports = Movie