const mongoose = require("mongoose")

const dbconection = async (DB_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "interviewtask"
        }
        await mongoose.connect(DB_URL, DB_OPTIONS);
        console.log("database connected")
    } catch (error) {
       console.log(error);
    }
}

module.exports = dbconection
