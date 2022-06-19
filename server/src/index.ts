import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server')
})

app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`)
})
