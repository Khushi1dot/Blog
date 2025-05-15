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
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/user", user);
app.use("/post", post);
app.use("/category", category);
