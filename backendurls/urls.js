const  express =  require("express");

const router = express.Router();

const authenticateToken = require('../backendfunctions/authentication/authenticateToken');

const signupUser = require('../backendfunctions/authentication/signup');

const loginUser = require('../backendfunctions/authentication/login');

const addProducts = require('../backendfunctions/activities/addPoducts');

const viewProducts = require('../backendfunctions/activities/viewProducts');

const addToCart = require('../backendfunctions/activities/addToCart');

const webConfFunc = require('../backendfunctions/activities/webConf');

router.post(`/api/signup`, signupUser);

router.post(`/api/login`, loginUser);

router.post(`/api/products/add`, addProducts);

router.post(`/api/cart/add`, authenticateToken.authAccount, addToCart);

router.get(`/api/webconf`, webConfFunc);

router.get(`/api/products/view`, viewProducts);

module.exports = router;
