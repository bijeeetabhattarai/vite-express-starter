import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 9001;
const MODE = process.env.NODE_ENV || "development";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.get("/api/mode", (_, res) => {
    return res.status(200).json({data: MODE})
});


// API routes
app.get("/api/test", (req, res) => {
  res.json({ message: "Build Test 2." });
});

app.use(express.static(path.join(__dirname, "../build/client")));

if (MODE === 'staging' || MODE === 'production') 
    app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../build/client/index.html"));
    });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
