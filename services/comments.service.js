const prisma = require("../config/database.js");

function addComment(message, postId, authorId) {
  return prisma.comment.create({
    data: {
      message,
      author: {
        connect: {
          id: authorId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
  });
}
  
function findCommentsByPost(postId) {
  return prisma.comment.findMany({
    where: {
      postId: postId,
    },
  });
}

function findCommentsByAuthor(authorId) {
  return prisma.comment.findMany({
    where: {
      authorId: authorId,
    },
  });
}

// function removeComment(id) {

// }

module.exports = {
  addComment,
  findCommentsByPost,
  findCommentsByAuthor,
  removeComment,
};
