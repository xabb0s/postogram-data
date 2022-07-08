const md5 = require("md5")
const { Router } = require("express")
const { createUser, findUser } = require("../services/user.service.js")
const multerUpload = require("../middlewares/multer-upload.js")

const router = Router()

router.post("/register", multerUpload.single("avatar"), async (req, res) => {

    const { username, password, firstName, lastName, age } = req.body

    const avatar = req.file.filename

    const existUser = await findUser(username)

    if (existUser) {
        res.status(400).json({
            message: `User: ${username}, already exist.`
        })
    }
    else {
        const token = md5(`${username}:${password}`)
        await createUser(username, password, firstName, lastName, +age, avatar, token)

        res.status(201).json({
            message: "User created!",
            user: {
                username,
                token
            }
        })
    }
})

router.post("/login", async (req, res) => {

    const { username, password } = req.body

    const existUser = await findUser(username)
    if (!existUser) {
        res.status(400).json({
            message: `User with username: ${username} not found.`
        })
    }
    else if (existUser.password !== password) {
        res.status(400).json({
            message: `Wrong username or password.`
        })
    }
    else {
        res.status(200).json({
            message: `Successful login.`,
            user: {
                username: existUser.username,
                token: existUser.token
            }
        })
    }
})


module.exports = router