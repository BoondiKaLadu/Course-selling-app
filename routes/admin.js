const { Router } = require('express');
const { adminModel, courseModel } = require('../db');  // this now works



const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
//we can have separate passwords for signing user jwt, admin jwts etc
const {JWT_SECRET_ADMIN} = require("../config");
const z = require('zod');
const { adminMiddleware } = require('../middlewares/admin');

// call the router function
const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {

  const zodstructure = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(10),
  firstName: z.string(),
  lastName: z.string()
});

// this parsed variable will only exist for zod 
// and on the end point where we use zod

const parsed = zodstructure.safeParse(req.body);
// checking if data has been parsed
if (!parsed.success) {
     res.json({
        message : "Incorrect format"
     });
       
}
  try {
const {email, password, firstName, lastName} = parsed.data; 
// we do not store plain text password into the database
//  and hast it using bcrypt library and salting

 const hashed_password = await bcrypt.hash(password, 5);


  await adminModel.create({
    email,
    password : hashed_password,
    firstName,
    lastName
  });

} catch (err) {
    console.error("Failed", err);
    return res.json({
      message: "signup failed"
    });
  }

  res.json({
    message: "signup endpoint sucess"
  });
});
  




adminRouter.post("/signin", async function (req, res) {
// we need request data from client, so req. data
const {email, password} = req.body;

//this admin variable will now handle the admin database for this routw
// calling anything in admin database will be done as : admin.password etc
const admin = await adminModel.findOne({email});
const passwordMatch = await bcrypt.compare(password, admin.password);

if (admin && passwordMatch) {
  const token = jwt.sign({
        id: admin._id  
      }, JWT_SECRET_ADMIN);
      res.json ({
        token : token
      });

      } else {
    res.status(403).json({
      message : "Incorrect credentials, admin not found"
    });
}

  res.json({
    message: "signin endpoint"
  });

});

// watch creating a web3 saas by kirat

//adminRouter.use(adminMiddleware);

adminRouter.put("/course-creation", adminMiddleware, async function (req, res) {
  // from the admin.js middleware line => req.userID = decoded.id;
  // this id (userId) is what we take from admin as request object
  // and put it in adminId variable
const adminId = req.userId;
const {title, description, imageurl, price} = req.body;
// check the database schema created for storing
// courses created by the admin in db.js file
const course = await courseModel.create({
 title,
 description,
 price,
 imageurl,
 creatorId : adminId

})

  res.json({
    message: "course creation endpoint"
  });
});

adminRouter.put("/course-editing", adminMiddleware, async function (req, res) {
  // from the admin.js middleware line => req.userID = decoded.id;
  // this id (userId) is what we take from admin as request object
  // and put it in adminId variable
const adminId = req.userId;
const {title, description, imageurl, price, courseId} = req.body;
// check the database schema created for storing
// courses created by the admin in db.js file





const course = await courseModel.updateOne({
_id : courseId
},

{
  // only update the course where courseId and creator Id match
  // so that creators do not edit each other's course.


 title,
 description,
 price,
 imageurl,
 

})

  res.json({
    message: "course updated",
    courseId : course._id
  });

});

adminRouter.get("/bulk", adminMiddleware, async function (req, res) {

  const adminId = req.userId;
  const course = await courseModel.find({
   creatorId : adminId

  });

  res.json({
    message: "bulk endpoint"
  });
});

// CommonJS export
module.exports = adminRouter;

