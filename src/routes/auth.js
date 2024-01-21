const router = require('express').Router();
const { checkSchema } = require('express-validator');


const {logIn, logOut} = require('../app/Controllers/AuthController.js');
const validationMiddleware = require('../app/Middlewares/Validation.js');
const verifyJWT = require('../app/Middlewares/VerifyJWT.js');


const authSchema = require('../app/Schemas/Auth');

router.post('/login',checkSchema(authSchema.login),validationMiddleware,logIn);

router.post('/logout', verifyJWT, logOut);

module.exports = router;
