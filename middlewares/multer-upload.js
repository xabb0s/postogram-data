const { mediaType, MediaType } = require("@prisma/client")
const multer = require("multer")
const { v4 } = require('uuid')

const storage = multer.diskStorage({

  filename: (req, file, cb) => {
    const { mediaType } = req.body

    if (mediaType === MediaType.PHOTO) {
      cb(null, v4() + ".png")
    }

    else if (mediaType === MediaType.VIDEO) {
      cb(null, v4() + ".mp4")
    }

    else {
      cd(null, v4() + ".png")
    }
  },

  destination: (req, file, cb) => {
    const { mediaType } = req.body

    if (mediaType === MediaType.PHOTO) {
      cd(null, "storage/photos")
    }

    else if (mediaType === MediaType.VIDEO) {
      cd(null, "storage/videos")
    }

    else {
      cd(null, "storage/avatars")
    }
  }
})

module.exports = multer({ storage })