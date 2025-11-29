// routes/course.js
const { Router } = require("express");

const courseRouter = Router();

courseRouter.get("/preview", function (req, res) {

  res.json({

    message: "courses fetched",

  });

});

courseRouter.get("/purchase", function (req, res) {
  // in real world we want user to pay for the courses
  res.json({
    message: "courses fetched"
  });
});

module.exports = courseRouter;
