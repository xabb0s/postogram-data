const { prisma } = require("../config/database")
const { router } = require("../routes/auth.routes")

function createUser(username, password) {
    return prisma.user.create({
        data: {
            username,
            password
        }
    })
}

// check username
function findUser(username) {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    })
}

module.exports = {
    createUser,
    findUser
}