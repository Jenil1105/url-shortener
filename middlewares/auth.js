const { getuser } = require("../services/auth");

function restrictedToLoggedinUsers(req, res, next) {
    const userId = req.cookies.uid;
    if(!userId) return res.redirect("/login");

    const user = getuser(userId);
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
};

function checkAuth(req, res, next) {
    req.user = getuser(req.cookies.uid);
    next();
}

module.exports = {restrictedToLoggedinUsers, checkAuth};