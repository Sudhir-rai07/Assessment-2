import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import connectToDB from './db/db.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT
const __dirname = path.resolve()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

import authRoute from './routes/auth.routes.js'
import taskRoute from './routes/task.routes.js'
import contactRoute from './routes/contact.routes.js'
app.use("/api/auth",authRoute )
app.use("/api/task", taskRoute)
app.use("/api/contact", contactRoute)


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, ()=>{
    connectToDB()
    console.log(`App is running on port ${PORT}`)
})