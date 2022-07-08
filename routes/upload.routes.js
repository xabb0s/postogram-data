const { Router } = require("express")
// const multerUploads = require("../middlewares/multer-upload.js")

const router = Router()

// router.post("/upload", multerUploads.single("avatar"), (req, res) => {
//   console.log("File uplaoded: ", req.file.filename)
//   res.send(req.file.filename)
// })

router.get("/download/:filename", (req, res) => {
  res.sendFile(req.params.filename, { root: "./storage" })
})

module.exports = router