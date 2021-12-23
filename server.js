const express = require("express")
const cors = require("cors")
const app = express()
const settings = require("./settings")
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())

const connection = `mongodb+srv://${settings.DATABASE.USERNAME}:${settings.DATABASE.PASSWORD}@${settings.DATABASE.HOST}/${settings.DATABASE.DATABASE}?retryWrites=true&w=majority`
mongoose.connect(connection).then(()=>{
    console.info("Connected to database")
}).catch((e)=>{
    console.error(`Connecting to database failed: ${e}`)
})

const user_router = require("./users/router")
const blog_router = require("./blog/router")
app.use(user_router)
app.use(blog_router)

app.listen(settings.PORT, settings.HOST, ()=>{
    console.info(`Server is running`)
})