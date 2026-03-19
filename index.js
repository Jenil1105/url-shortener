const express = require("express");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectToMongo } = require("./connectMongo");
const URL = require("./models/url");
const { restrictedToLoggedinUsers, checkAuth } = require("./middlewares/auth");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());

const mongoUrl = process.env.MONGO_URL;

connectToMongo(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection failed:", err);
    });


app.use("/url",restrictedToLoggedinUsers, urlRoute);
app.use("/user", userRoute);
app.use("/",checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );
    res.redirect(entry.redirectedUrl);
})

