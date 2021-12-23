const jwt = require('jsonwebtoken');
const settings = require("./settings")
const {$response} = require("./utils")
const {User} = require("./users/models")


async function common_auth(req){
    let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"]
    
    if (!token) {
        throw "Login is required"
    }

    if(token.search("Bearer") != -1 || token.search("bearer") != -1){
        token = token.replace("Bearer ", "")
        token = token.replace("bearer ", "")
    }

    try {
        const payload = jwt.verify(token, settings.SECRET_KEY)
        const exp = new Date(payload.created)
        exp.setSeconds(exp.getSeconds() + settings.JWT_EXPIRE_TIME)
        console.log(exp)
        console.log(new Date())
        if(new Date() > exp){
            throw "Wrong login credentials"
        }
        return await User.findById(payload.id)
    } catch (err) {
        throw "Wrong login credentials"
    }
}


const AuthGeneral = async (req, res, next)=>{
    try{
        const user = await common_auth(req)
        req.user = user
    }catch(e){
        return $response(res, 403, {
            success: false,
            err: e,
        })
    }
    return next();
}


const AuthAdmin = async (req, res, next)=>{
    try{
        const user = await common_auth(req)
        if(!user.is_admin){
            throw "Admin access required"
        }
        req.user = user
    }catch(e){
        return $response(res, 403, {
            success: false,
            err: e,
        })
    }
    return next();
}

module.exports = {
    AuthGeneral,
    AuthAdmin,
}
