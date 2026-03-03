const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongo } = require("./connectMongo");
const URL = require("./models/url");

mongoUrl = "mongodb+srv://jenilURL:jJ123456%40@cluster0.yw2lsnc.mongodb.net/?appName=Cluster0"

const app = express();
const PORT = 8000;

app.use(express.json());

connectToMongo(mongoUrl).then(() => console.log("mongo connected..."));


app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
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

app.listen(PORT, () => {
    console.log("server started on port ", PORT);
}); 
