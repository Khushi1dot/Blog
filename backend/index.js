const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const user = require("./router/user.router");
const category = require("./router/category.route");
const cors = require("cors");
const authentication = require("./middlewares/authentication");
const multer = require("multer");
const post = require("./router/post.routes");
const app = express();
const path = require("path");
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGODB_URL || 8080;
const fs = require("fs");
const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin, "origin");

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(express.json());
// app.use(cors());
app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("mongoDb connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error:", err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
   const safeName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");

  cb(null, safeName);
  console.log("Saving to path:", path.join(__dirname, "images"));
console.log("File exists:", fs.existsSync(safeName));
  },
  
});

const upload = multer({ storage: storage });
console.log(upload,'upload');
try {
  app.post("/upload", upload.single("file"), (req, res) => {
  // console.log(upload,'upload');
  // console.log(file,'file');
  // res.status(200).json("File has been uploaded",upload);
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Uploaded file:", req.file);

    res.status(200).json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      filePath: `/images/${req.file.filename}`,
    });
});
} catch (error) {
  res.status(500).json({"file not uploaded" : error});
  console.log(error,'error in uploading file');
}


app.use("/user", user);
app.use("/post", post);
app.use("/category", category);
