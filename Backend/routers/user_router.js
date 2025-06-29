const router = require('express').Router();
const {body} = require('express-validator');
const user_Controller = require('../controllers/user_controller');
const middleware=require('../middleware/auth.middleware')
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:5}).withMessage('Password should be atleast 5 characters long'),
    body('fullname').isLength({min:3}).withMessage('First name should be atleast 3 characters long'), 

   ],
   user_Controller.registerUser
)
router.post('/login',[
      body('email').isEmail().withMessage('Invalid Email'),
      body('password').isLength({min:5}).withMessage('Password should be atleast 5 characters long')
      ],
      user_Controller.loginUser
   )     
router.get('/userProfile',middleware.authUser,user_Controller.userProfile)
router.get('/logout',middleware.authUser,user_Controller.logout)
   module.exports=router;