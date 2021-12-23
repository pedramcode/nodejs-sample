const crypto = require("crypto")


const hasher = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex')
}

const $response = (res, status, data, content_type="application/json")=>{
    res.status(status)
    res.setHeader("content-type", content_type)
    return res.send(data)
}

const token = (length=10)=>{
    var str_set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_"
    var a = str_set.split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

module.exports = {
    hasher,
    $response,
    token,
}