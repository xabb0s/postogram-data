const { Router } = require("express")
const { createPost, findPostByAuthor, deletePost, userHasPost } = require("../services/post.service.js")
const authentification = require("../middlewares/authentification.js")
const multerUpload = require("../middlewares/multer-upload.js")

const router = Router()

router.get("/posts/:username", authentification, async (req, res) => {
  try {
    const posts = await findPostByAuthor(req.params.username)

    res.json({
      status: `User @${req.params.username}`,
      posts
    })
  }
  catch (err) {
    res.json({
      status: "bad",
      error: err
    })
  }
})

router.post("/posts", authentification, multerUpload.single("media"), async (req, res) => {
  try {
    const { title, description, mediaType } = req.body
    const media = req.file.filename
    const authorId = res.locals.user.id

    const newPost = await createPost(authorId, media, mediaType, title, description)

    res.json({
      status: "ok",
      msg: "Post created.",
      post: newPost
    })
  }
  catch (err) {
    res.json({
      status: "bad",
      error: err
    })
  }
})

router.delete("posts/:id", authentification, async (req, res) => {
  try {

    const postId = req.params.id
    const userId = res.locals.user.id

    if (await userHasPost(userId, postId)) {
      const post = await deletePost(postId)

      res.json({
        status: "ok",
        msg: "Post deleted.",
        post
      })
    }
  }
  catch (err) {
    res.json({
      status: "bad",
      msg: "You can't delete this post."
    })
  }
})

module.exports = router