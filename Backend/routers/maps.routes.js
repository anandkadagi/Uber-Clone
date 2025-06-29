const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const mapsController = require('../controllers/maps.controller');
const {query}=require('express-validator')
router.get('/getLocation',query('address').isString().isLength({min:3}),authMiddleware.authUser,mapsController.getLocation);
router.get('/getDistance',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapsController.getDistance
)
router.get('/getSuggestions',
    query('input').isString().isLength({min:1}),
    authMiddleware.authUser,
    mapsController.getSuggestions
)

module.exports=router