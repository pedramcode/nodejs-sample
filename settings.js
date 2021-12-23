const settings = {
    DEBUG: true,
    HOST: "0.0.0.0",
    PORT: 8080,
    DATABASE: {
        HOST: "mycluster.nxxtx.mongodb.net",
        USERNAME: "pedram",
        PASSWORD: "123",
        DATABASE: "sample_database",
    },
    OTP_LIFE_TIME: 10 * 60,
    JWT_EXPIRE_TIME: 7 * 24 * 60 * 60,
    SECRET_KEY: "ggwGr55y75657$WTRGHfkh23$%^$^%wejnweorasidgepy54^YRTYY^24j6574w",
}


module.exports = settings