const md5 = require("md5")
const { Router } = require("express")
const { createUser, findUser } = require("../services/user.service.js")

const router = Router()

router.post("/register", async (req, res) => {

    const { username, password, firstName, lastName, age } = req.body

    const existUser = await findUser(username)

    if (existUser) {
        res.status(400).json({
            message: `User: ${username}, already exist.`
        })
    }
    else {
        const token = md5(`${username}:${password}`)
        const newUser = await createUser(username, password, firstName, lastName, age, token)

        res.status(201).json({
            message: "User created!",
            user: {
                username,
                token
            }
        })
    }
})

router.post("/login", (req, res) => {
    res.send("Login")
})


module.exports = router