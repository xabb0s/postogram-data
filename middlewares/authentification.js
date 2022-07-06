const { findUserByToken } = require("../services/user.service.js")

const authentification = async (req, res, next) => {

  if (!req.header('Authorization')) {
    return res.json({
      status: "error",
      message: "Token not provided."
    })
  }
  
  const token = req.header('Authorization').split(' ')[1]
  
  const user = await findUserByToken(token)
  
  if (user === null) {
    return res.json({
      status: "error",
      message: "Invalid token."
    })
  }

  res.locals.user = user

  next()
}

module.exports = authentification