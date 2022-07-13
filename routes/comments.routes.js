const { Router } = require("express")
const { addComment, findCommentsByAuthor, findCommentsByPost } = require("../services/comments.service.js")
const authentification = require("../middlewares/authentification.js")

const router = Router()

router.post("/comments", authentification, async (req, res) => {
  const { message, postId} = req.body
  const authorId = res.locals.user.id

  try {
    const comment = addComment(message, postId, authorId)

    res.json({
      status: "ok",
      msg: "Comment posted.",
      comment: comment
    })
  }
  catch (err) {
    res.json({
      status: "bad",
      msg: "Error on post comment",
      error: err
    })
  }
})

router.get("/comments/post/:id", authentification, async (req, res) => {
  const postId = req.params.id

  try {
    const comments = findCommentsByPost(postId)

    res.json({
      status: "ok",
      msg: "Everything is okay!",
      comments: comments
    })
  }
  catch (err) {
    res.json({
      status: "bad",
      msg: "Error on find comments by Post",
      error: err
    })
  }
})

router.get("/comments/author/:id", authentification, async (req, res) => {
  const authorId = req.params.id

  try {
    const comments = findCommentsByAuthor(authorId)

    res.json({
      status: "ok",
      msg: "Everything is okay",
      comments: comments
    })
  }
  catch (err) {
    res.json({
      status: "bad",
      msg: "Error on find comments by Author",
      error: err
    })
  }
})


module.exports = router