const { Router } = require('express');
const { adminModel } = require('../db');  // this now works

// call the router function
const adminRouter = Router();

adminRouter.post("/signup", function (req, res) {
  const email = req.body.username;
  
  res.json({
    message: "signup endpoint"
  });
});

adminRouter.post("/signin", function (_, res) {
  res.json({
    message: "signin endpoint"
  });
});

//adminRouter.use(adminMiddleware);

adminRouter.put("/course-creation", function (_, res) {
  res.json({
    message: "course creation endpoint"
  });
});

adminRouter.get("/bulk", function (_, res) {
  res.json({
    message: "bulk endpoint"
  });
});

// CommonJS export
module.exports = adminRouter;
