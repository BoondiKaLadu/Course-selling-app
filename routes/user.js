// routes/user.js
const { Router } = require("express");
const {userModel} = require("../db");
const userRouter = Router();

userRouter.post("/signup", function (req, res) {
const {email, password, firstName, lastName} = req.body; // adding zod validation

// todo : hash password with bcrypt



  res.json({
    message: "signup endpoint"
  });
});


userRouter.post("/signin", function (req, res) {
  res.json({
    message: "signin endpoint"
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "courses fetched"
  });
});

module.exports = userRouter;
