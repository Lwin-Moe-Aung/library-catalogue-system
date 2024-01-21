const router = require('express').Router();
const { checkSchema } = require('express-validator');


const { getLists, getById, create, update, destroy} = require('../app/Controllers/AuthorController.js');
const verifyJWT = require('../app/Middlewares/VerifyJWT.js');
const verifyIsAdmin = require('../app/Middlewares/VerifyIsAdmin.js');
const {tryCatch} = require('../app/Helpers/TryCatch');

const authorSchema = require('../app/Schemas/Author.js');

router.get('/', verifyJWT, verifyIsAdmin(), getLists);
router.get('/:id', verifyJWT, verifyIsAdmin(),tryCatch(getById));
router.post('/create', checkSchema(authorSchema.create), verifyJWT, verifyIsAdmin(), tryCatch(create));
router.put('/update', checkSchema(authorSchema.create), verifyJWT, verifyIsAdmin(), tryCatch(update));
router.post('/delete', verifyJWT, verifyIsAdmin(), tryCatch(destroy));



module.exports = router;
