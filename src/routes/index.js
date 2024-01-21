const router = require('express').Router();

const authRoute = require('./auth');
const categoryRoute = require('./category');
const studentRoute = require('./student');
const authorRoute = require('./author');
const bookRoute = require('./book');




router.use('/auth', authRoute);
router.use('/category', categoryRoute);
router.use('/student', studentRoute);
router.use('/author', authorRoute);
router.use('/book', bookRoute);



module.exports = router;
