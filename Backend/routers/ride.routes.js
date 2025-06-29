const express = require('express');
const router = express.Router();
const rideController=require('../controllers/ride.controller')
const authMiddleware=require("../middleware/auth.middleware")
const{body} = require('express-validator');
router.post('/create',
    authMiddleware.authUser,
    [
   
    body('pickup').isString().isLength({min:3}).withMessage("Invalid pickup value"),
    body('destination').isString().isLength({min:3}).withMessage("Invalid destination value"),
    body('vehicleType').isString().isIn(["car","auto","bike"]).withMessage("Invalid vehicle value")   
    
],
rideController.createRide
)
router.post('/fair',[
    body('pick').isString().isLength({min:3}).withMessage("Invalid pickup value"),
    body('drop').isString().isLength({min:3}).withMessage("Invalid destination value")
],
authMiddleware.authUser,
rideController.getFair
)
router.post('/confirm',[
    authMiddleware.authCaptain,
    rideController.comfirmRide
])
router.post('/start-ride',
    [
        body('otp').isString().isLength({min:6,max:6}).withMessage('Invalid OTP')
    ],
    authMiddleware.authCaptain,
    rideController.startRide
)
router.post('/end-ride',
    [
        body('ride_id').isString().withMessage('Invalid ID')
    ],
    authMiddleware.authCaptain,
    rideController.endRide
)
router.get('/earnings',
    authMiddleware.authCaptain,
    rideController.getEarning
)
router.post('/set_status',
    [
        body('captain_id').isString().isLength({min:24,max:24}).withMessage('Invalid ID')
    ],
    authMiddleware.authCaptain,
    rideController.setStatus
)

module.exports=router;