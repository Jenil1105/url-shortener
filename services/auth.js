const jwt = require("jsonwebtoken");
const secret = "jenilsavaj"

function setUser(user){
    const payload = {id: user._id, email:user.email};
    return jwt.sign(payload, secret);
}

function getuser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

module.exports = {setUser, getuser};