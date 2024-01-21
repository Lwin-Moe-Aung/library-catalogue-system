const router = require('express').Router();
const { checkSchema } = require('express-validator');


const { getLists, getById, create, update, destroy} = require('../app/Controllers/CategoryController.js');
const verifyJWT = require('../app/Middlewares/VerifyJWT.js');
const verifyIsAdmin = require('../app/Middlewares/VerifyIsAdmin.js');
const {tryCatch} = require('../app/Helpers/TryCatch');

const categorySchema = require('../app/Schemas/Category.js');

router.get('/', verifyJWT, verifyIsAdmin(), getLists);
router.get('/:id', verifyJWT, verifyIsAdmin(),tryCatch(getById));
router.post('/create', checkSchema(categorySchema.create), verifyJWT, verifyIsAdmin(), tryCatch(create));
router.put('/update', checkSchema(categorySchema.create), verifyJWT, verifyIsAdmin(), tryCatch(update));
router.post('/delete', verifyJWT, verifyIsAdmin(), tryCatch(destroy));



module.exports = router;
