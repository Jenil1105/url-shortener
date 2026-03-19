const { set } = require("mongoose");

const sessionUserMap = new Map();

function setUser(id, user){
    sessionUserMap.set(id, user);
}

function getuser(id) {
    return sessionUserMap.get(id);
}

module.exports = {setUser, getuser};