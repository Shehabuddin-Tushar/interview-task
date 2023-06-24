const express = require("express");
const cors = require("cors")
require("dotenv").config();
const port = process.env.PORT || 5000
const app = express()
const placeRoute = require("./routes/placeroutes")
const userRoute = require("./routes/userroutes")
const hotelRoute = require("./routes/hotelroutes")
const roomRoute = require("./routes/roomroutes")
const dbconection = require("./config/dbconection")

app.use(cors());
app.use(express.json());
const dburl = process.env.DB_URL

dbconection(dburl)

app.use("/places/api/", placeRoute)
app.use("/user/api/", userRoute)
app.use("/hotels/api/", hotelRoute)
app.use("/rooms/api/", roomRoute)

app.listen(port, () => {
    console.log(`server running in ${port}`)
   
})