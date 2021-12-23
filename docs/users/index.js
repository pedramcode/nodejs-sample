const loginUser = require("./login")

module.exports = {
    paths: {
        '/user/login': {
            ...loginUser
        },
    },
}