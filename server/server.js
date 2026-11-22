const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const modelsRoute = require("./routes/models");

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to OneAtlas API!",
        status: "Backend is running successfully"
    });
});

app.use("/api/models", modelsRoute);

const PORT = 5000;

const server = app.listen(PORT, () => {
    console.log(`OneAtlas server running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
    console.error("Server error:", error);
});