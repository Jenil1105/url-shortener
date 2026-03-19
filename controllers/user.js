const User = require("../models/user");
const {v4} = require("uuid");
const { setUser } = require("../services/auth");

async function handleSignUp(req, res) {

    const { name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });

    return res.redirect("/");
    
};

async function handleLogin(req, res) {

    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user){
        return res.render("login");
    }
    const sessionId = v4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
    
}

module.exports = {handleSignUp, handleLogin};