const prisma = require("../config/database")

function createUser(username, password, firstName, lastName, age, token) {
    return prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName, 
            age,
            token
        }
    })
}

// check username
function findUser(username) {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}

function findUserByToken(token) {
    return prisma.user.findUnique({
        where: {
            token
        }
    })
}

module.exports = {
    createUser,
    findUser,
    findUserByToken
}