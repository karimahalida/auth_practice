const db = require("../models")
const user = db.User

module.exports = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body

            const result = await user.create({
                firstName,
                lastName,
                email,
                password
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
    }
}