const usermodel = require('../db/models/user_module');
module.exports.CreateUser = async (fullname,email,password) => {
if(!fullname || !email || !password){
    throw new Error('All fields are required');
}
const user= usermodel.create({
    fullname,
    email,
    password
});
return user;
}