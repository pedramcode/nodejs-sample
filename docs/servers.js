const settings = require("../settings")

module.exports = {
    servers: [
        {
            url: `http://127.0.0.1:${settings.PORT}`, 
            description: "Local weblog server", 
        },
    ],
}