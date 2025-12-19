require('dotenv').config()
console.log(process.env.Mongo_Pass);
const express = require("express");



const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// Routers
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const adminRouter = require("./routes/admin");

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

// Simple test route
app.get("/", (req, res) => {
  res.send("Server is up");
});

async function main() {
  try {
    await mongoose.connect(process.env.Mongo_Pass);
    console.log("Database connected");

    app.listen(3001, () => {
      console.log("Backend started on port 3001");
    });
  } catch (err) {
    console.error("Database crashed:", err);
    process.exit(1);
  }
}

main();
