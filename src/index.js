const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { default: mongoose } = require("mongoose")
const route = require("./routes/route")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


const DB_url = "mongodb+srv://sp01041998:71HOQkRVAWXnVxw0@cluster0.deqvc.mongodb.net/wysa-Assignment"

mongoose.connect(DB_url).then(()=> console.log("mongoDB is Connected")).catch((err)=> console.log(err))

app.use("/", route)

let port= 3000
app.listen(3000, ()=> {
    console.log(`express app is running on the port ${port}`)
})

