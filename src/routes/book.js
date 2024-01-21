const router = require('express').Router();
const { checkSchema } = require('express-validator');


const { getLists, getById, create, update, destroy} = require('../app/Controllers/BookController.js');
const verifyJWT = require('../app/Middlewares/VerifyJWT.js');
const verifyIsAdmin = require('../app/Middlewares/VerifyIsAdmin.js');
const {tryCatch} = require('../app/Helpers/TryCatch');

const bookSchema = require('../app/Schemas/Book.js');

router.get('/', verifyJWT, verifyIsAdmin(), getLists);
router.get('/:id', verifyJWT, verifyIsAdmin(),getById);
router.post('/create', checkSchema(bookSchema.create), verifyJWT, verifyIsAdmin(), create);
router.put('/update', checkSchema(bookSchema.update), verifyJWT, verifyIsAdmin(), update);
router.post('/delete', verifyJWT, verifyIsAdmin(), tryCatch(destroy));



module.exports = router;
