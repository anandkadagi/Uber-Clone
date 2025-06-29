
const router =require('express').Router();
const captaincontroller = require('../controllers/captain.controller');
const{body} = require('express-validator');
const authmiddleware = require('../middleware/auth.middleware');
router.post('/register',  [
body('fullname').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
body('email').isEmail().withMessage('Invalid email'),
body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')

],
captaincontroller.registerCaptain
)
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:5}).withMessage('Password should be atleast 5 characters long')
],
captaincontroller.logincaptain
)
router.get('/captainProfile',authmiddleware.authCaptain,captaincontroller.captainProfile);
router.get('/logout',authmiddleware.authCaptain,captaincontroller.logout);
module.exports = router;
router.post('/setTimings',[
    body('captain_id').isString().isLength({min:24,max:24}).withMessage('Invalid ID')
],
authmiddleware.authCaptain,
captaincontroller.setTimings
)
