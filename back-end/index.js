const express = require("express")
const PORT = 2000
const app = express()
const db = require("./models")
const { authControllers } = require("./controllers")
// const { authRouters } = require("./routers")
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("This is my API")
})

const { authRouters } = require("./routers")
app.use("/auth", authRouters)

app.listen(PORT, () => {
    // db.sequelize.sync({ alter: true })
    console.log(`server running at port : ${PORT}`);
})