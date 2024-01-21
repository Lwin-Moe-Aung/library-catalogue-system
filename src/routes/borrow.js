const router = require('express').Router();
const { checkSchema } = require('express-validator');


const { borrowRecordByAdmin, borrowReturn} = require('../app/Controllers/BorrowRecordController.js');
const verifyJWT = require('../app/Middlewares/VerifyJWT.js');
const verifyIsAdmin = require('../app/Middlewares/VerifyIsAdmin.js');
const {tryCatch} = require('../app/Helpers/TryCatch');


router.post('/record', verifyJWT, verifyIsAdmin(), borrowRecordByAdmin);
router.post('/return',  verifyJWT, verifyIsAdmin(), tryCatch(borrowReturn ));



module.exports = router;
