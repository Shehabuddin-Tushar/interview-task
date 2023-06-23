const UserModel = require("../models/userSchema")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const transporter = require("../config/email.config");
exports.userRegister = async (req, res) => {
    const { name, email, password, confirm_pass} = req.body
    console.log(name, email, password)
    const user = await UserModel.findOne({ email: email })
    if (user) {
        res.send({ "status": "failed", "messege": "email already exists" })

    } else {
        if (name && email && password && confirm_pass) {
            if (password === confirm_pass) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashpassword = await bcrypt.hash(password, salt);
                    const doc = new UserModel({
                        name: name,
                        email: email,
                        password: hashpassword
                      
                    })
                    const user = await doc.save()

                    res.send({ "status": "success", "messege": "Registerd successfully", "user": user })
                } catch (e) {
                    console.log(e)
                    res.send({ "status": "failed", "messege": "unable to register" })
                }

            } else {
                res.send({ "status": "failed", "messege": "password and confirm password doesnot match" })
            }
        } else {
            res.send({ "status": "failed", "messege": "All fields are required" })
        }
    }
}


exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    console.log(email,password)
    try {
        const user = await UserModel.findOne({ email: email })
        if (email && password) {
            if (user !== null) {
                const ismatch = await bcrypt.compare(password, user.password)
                if ((user.email === email) && ismatch) {
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
                    res.send({ "status": "success", "messege": "user logged in successfully", "token": token })

                } else {
                    res.send({ "status": "failed", "messege": "your credential doesnt match" })

                }

            } else {
                res.send({ "status": "failed", "messege": "your credential doesnt match" })

            }
        } else {
            res.send({ "status": "failed", "messege": "All fields are required" })
        }
    } catch (e) {
        console.log(e)
        res.send({ "status": "failed", "messege": "unable to login" })
    }


}

exports.changeuserpassword = async (req, res) => {
    const { password, confirm_pass } = req.body

    if (password && confirm_pass) {
        if (password !== confirm_pass) {
            res.send({ "status": "failed", "messege": "password and confirm password doesnt match" })

        } else {
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password, salt);
            const passchange = await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: hashpassword } })
            console.log(passchange)
            res.send({ "status": "success", "messege": "password changed successfully" })
        }
    } else {
        res.send({ "status": "failed", "messege": "All fields are required" })
    }


}

exports.loggeduserdata = async (req, res) => {
    const user = await UserModel.findById({ _id: req.user._id }).select("-password")
    res.send({ "status": "success", "messege": "userdata from database", "user": user })

}

exports.senduserpasswordresetemail = async (req, res) => {
    const { email } = req.body
    console.log(email)
    if (email) {
        const user = await UserModel.findOne({ email: email })
        console.log(user, "ok")
        if (user) {
            const secretid = user._id + process.env.JWT_SECRET;
            const token = jwt.sign({ userID: user._id }, secretid, { expiresIn: "15m" })

            const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
            console.log(link)
            try {
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM, // sender address
                    to: user.email, // list of receivers
                    subject: `Hello ✔ ${user.name} this is password reset link`, // Subject line
                    //text: "Hello world?", // plain text body
                    html: `<a href=${link}>click here</a>to reset your password`, // html body
                });
                res.send({ "status": "success", "messege": "password reset link send your email--check your email" })
            } catch (e) {
                console.log(e)
                res.send({ "status": "failed", "messege": "invalid email config" })
            }

        } else {
            res.send({ "status": "failed", "messege": "email doesnt exists" })
        }
    } else {
        res.send({ "status": "failed", "messege": "Email field are required" })
    }
}

exports.resetpassword = async (req, res) => {
    const { password, confirm_pass } = req.body
    const { id, token } = req.params
    const user = await UserModel.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET
    try {
        jwt.verify(token, new_secret)
        if (password && confirm_pass) {
            if (password !== confirm_pass) {
                res.send({ "status": "failed", "messege": "password and confirm password doesnt match" })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashpassword = await bcrypt.hash(password, salt)
                const passchange = await UserModel.findByIdAndUpdate(user._id, { $set: { password: hashpassword } })

                res.send({ "status": "success", "messege": "password reset successfully" })
            }
        } else {
            res.send({ "status": "failed", "messege": "All fields are required" })
        }
    } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "messege": "Invalid token" })
    }

}





