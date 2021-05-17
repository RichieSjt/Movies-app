const mongoose = require('mongoose')
const MONGODB_URL = "mongodb://127.0.0.1:27017/netflix_db"

const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Connected to db successfully")
    } catch (e) {
        console.log("Could not connect to db")
    }   
}

module.exports = {
    connect
}