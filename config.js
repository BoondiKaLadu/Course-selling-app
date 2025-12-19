// WE CREATED THIS FILE TO END THE CIRCULAR DEPENDENCY

// now config 


const JWT_SECRET_User =  process.env.JWT_SECRET_User;
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN ;

module.exports = {
    JWT_SECRET_ADMIN,
    JWT_SECRET_User
}