const path = require('path')
const express = require('express')
const db = require('./db/mongoose')
const Title = require('./models/movie')

db.connect()

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Application routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', '/index.html'))
})

app.post('/movie/:title', async (req, res) => {
    const title = req.params.title
    const result = await Title.aggregate([
        {$match: {
            $and: [{type: 'Movie'}, {title: title}]
        }},
        {$project: {
            _id: 0,
            title: 1,
            director: 1,
            cast: 1,
            country: 1,
            release_year: 1,
            rating: 1,
            listed_in: 1,
            description: 1,
            type: 1
        }}
    ])

    res.send(result)
})

app.post('/tvshow/:title', async (req, res) => {
    const title = req.params.title
    const result = await Title.aggregate([
        {$match: {
            $and: [{type: 'TV Show'}, {title: title}]
        }},
        {$project: {
            _id: 0,
            title: 1,
            director: 1,
            cast: 1,
            country: 1,
            release_year: 1,
            rating: 1,
            listed_in: 1,
            description: 1,
            type: 1
        }}
    ])

    res.send(result)
})

app.post('/actor/:actor', async (req, res) => {
    const actor = req.params.actor
    const result = await Title.aggregate([
        {$unwind: "$cast"},
        {$match: {cast: actor}},
        {$project: {
            _id: 0,
            title: 1,
            director: 1,
            country: 1,
            release_year: 1,
            rating: 1,
            listed_in: 1,
            description: 1,
            type: 1
        }}
    ])

    res.send(result)
})

app.post('/country/:country', async (req, res) => {
    const country = req.params.country
    const count = await Title.find({$and: [{type: 'Movie'}, {country: country}]}).countDocuments()
    const result = {
        "count": count
    }

    res.send(result)
})

app.post('/year/:year', async (req, res) => {
    const year = req.params.year
    const count = await Title.find({$and: [{type: 'TV Show'}, {release_year: year}]}).countDocuments()
    const result = {
        "count": count
    }

    res.send(result)
})


app.get('/total-count', async (req, res) => {
    const count = await Title.countDocuments()

    const result = {
        "count": count
    }

    res.send(result)
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
