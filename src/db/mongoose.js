const mongoose = require('mongoose')
const MONGODB_URL = "mongodb+srv://pedrorangelp:2X2MwifJC5HvvtFp@mongodb-cluster.u0629.mongodb.net/netflix_db"

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