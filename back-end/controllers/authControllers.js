const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models")
const user = db.User

module.exports = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body

            if (!firstName || !lastName || !email || !password) throw "Fill all the fields"

            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(password, salt)

            const result = await user.create({
                firstName,
                lastName,
                email,
                password: hashPass
            })

            res.status(200).send({
                status: true,
                data: result,
                message: "Register Succeed"
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const userExist = await user.findOne({
                where: {
                    email
                }
            })
            if (!userExist) throw {
                status: false,
                message: "User Not Found"
            }

            const isValid = await bcrypt.compare(password, userExist.password)
            if (!isValid) throw "Wrong Password"

            const payload = { id: userExist.id }
            const token = jwt.sign(payload, "JWT", { expiresIn: "1h" })

            res.status(200).send({
                status: true,
                data: userExist,
                message: "Login Succeeded",
                token
            })

        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    }
}
