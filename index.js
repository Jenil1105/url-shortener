const express = require("express");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const path = require("path");
require("dotenv").config();
const { connectToMongo } = require("./connectMongo");
const URL = require("./models/url");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

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


// app.get("/", async(req,res)=>{
//     const allUrls = await URL.find({});
//     res.render('home', {urls:allUrls});
// })
app.use("/url", urlRoute);
app.use("/", staticRoute);

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

