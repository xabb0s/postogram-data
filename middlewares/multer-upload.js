const multer = require("multer")
const { v4 } = require('uuid')

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, v4() + ".png")
  },

  destination: (req, file, cb) => {
    cb(null, "storage")
  }
})

module.exports = multer({ storage })