const express = require("express");
const cors = require("cors")
require("dotenv").config();
const port = process.env.PORT || 5000

const app = express()
const placeRoute = require("./routes/placerotes")
const dbconection = require("./config/dbconection")

app.use(cors());
app.use(express.json());
const dburl = process.env.DB_URL

dbconection(dburl)

app.use("/places/api/",placeRoute)

app.listen(port, () => {
    console.log(`server running in ${port}`)
   
})