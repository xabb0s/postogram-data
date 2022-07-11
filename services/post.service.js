const prisma = require("../config/database.js");

function createPost(authorId, media, mediaType, title, description) {
  return prisma.post.create({
    data: {
      title,
      description,
      media,
      mediaType,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
}

async function userHasPost(userId, postId) {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userId
    }
  })

  return post !== null
}

function findPostByAuthor(username) {
  return prisma.post.findMany({
    where: {
      author: {
        username,
      },
    },
  });
}

function deletePost(id) {
  return prisma.post.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  createPost,
  findPostByAuthor,
  deletePost,
  userHasPost
};
