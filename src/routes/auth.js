const router = require('express').Router();
const { checkSchema } = require('express-validator');


const {logIn} = require('../app/Controllers/AuthController.js');
// const adminAuthMiddleware = require('../../middlewares/admin-auth.middleware');
const validationMiddleware = require('../app/Middlewares/Validation.js');
const authSchema = require('../app/Schemas/Auth');

// router.post(
//   '/login',
//   checkSchema(authSchema.login),
//   validationMiddleware,
//   logIn
// );
router.post('/hello', (req, res) => {
  console.log("hello world");
});
//router.post('/logout', adminAuthMiddleware, authController.logOut);

module.exports = router;
