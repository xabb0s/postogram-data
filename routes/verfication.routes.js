const { Router } = require("express")
const { user } = require("../config/database.js")
const authentification = require("../middlewares/authentification.js")
const { findUserByToken } = require("../services/user.service.js")

const router = Router()

router.get("/verify", authentification, async (req, res) => {
  
  const { username, firstName, lastName, age } = res.locals.user

  res.json({
    status: "success",
    message: "Successfuly authentificated.",
    user: {
      username,
      firstName,
      lastName,
      age
    }
  })
})

module.exports  = router 