const express = require("express");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();


// ugly routing way
 
//const {useroutescreate}    = require("./routes/user");
//const {createcourseroutes} = require("./routes/course");

//useroutescreate(app);
//createcourseroutes(app);









// NEW routing way
//importing
const userRouter   = require("./routes/user");
const courseRouter = require("./routes/course");
const adminRouter =  require("./routes/admin");
// if a request come on /user/ ..anything 
// it gets routed to user router on user.js
app.use("/user", userRouter); 
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

// before we do app.listen, we do mongoose.connect
//only if this happens, should we start to listen the port
// if mongoose .connect fails, our backend should not start
// so we put it inside an async await main function




async function main () {
  try {
    await mongoose.connect("mongodb+srv://admin:Aditya%401320@cluster0.pj1eck8.mongodb.net/Course-selling");

    console.log("Database connected");
  } catch (err) {
    console.error(" Database crashed:");
    process.exit(1); // Stop backend because DB is required
  }

app.listen(3001, () => {
  console.log("Backend started on port 3001");
});


}
main();





