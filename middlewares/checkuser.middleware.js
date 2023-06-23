const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema")

exports.checkuser = async (req, res, next) => {
    console.log("tushar")
    const { authorization } = req.headers;
    let token;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];

            const { userID } = jwt.verify(token, process.env.JWT_SECRET)
            let n = req.user = await UserModel.findById({ _id: userID }).select("-password")
            console.log(n)
            next()
        } catch (e) {
            console.log(e)
            res.send({ "status": "failed", "messege": "Unauthorized user" })

        }

    }

    if (!token) {
        res.send({ "status": "failed", "messege": "Unauthorized user. No token" })

    }

}