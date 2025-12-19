// routes/user.js
const { Router } = require("express");
const {userModel} = require("../db");
const userRouter = Router();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
//we can have separate passwords for signing user jwt, admin jwts etc
const {JWT_SECRET_User }= require("../config");
const z = require('zod');





userRouter.post("/signup", async function (req, res) {

  const zodstructure = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(10),
  firstName: z.string(),
  lastName: z.string()
});



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


  await userModel.create({
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


userRouter.post("/signin", async function (req, res) {
//this endpoint will just get email, password from the user

const {email, password} = req.body;
//database call so await on it, beause database might be somewhere in th us
// so we will have to the databse locally
try {
  // finding user's email in the databse remember findOne
const finduser = await userModel.findOne({ email });
//checking if the password of the user given during 
// signup matches with the salted one in our databse
const passwordMatch = await bcrypt.compare(password, finduser.password);
// if both user and his password exist in our databse
  if (user && passwordMatch) {
    const token = jwt.sign({
      id: finduser._id
    }, JWT_SECRET_User);
    res.json ({
      token : token
    });
  } else {
    res.status(403).json({
      message : "Incorrect credentials"
    });
  }
} catch (err) {
  res.status(403).json({
    message : "Incorrect credentials"
  })
}
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "courses fetched"
  });
});

module.exports = userRouter;
