const router = require('express').Router();

const authRoute = require('./auth');
const categoryRoute = require('./category');
const studentRoute = require('./student');
const authorRoute = require('./author');
const bookRoute = require('./book');
const borrowRoute = require('./borrow');


router.use('/auth', authRoute);
router.use('/category', categoryRoute);
router.use('/student', studentRoute);
router.use('/author', authorRoute);
router.use('/book', bookRoute);
router.use('/borrow', borrowRoute);




module.exports = router;
