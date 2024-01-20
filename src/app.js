const cors = require('cors');
const express = require('express');

const errorHandler = require('./app/Middlewares/ErrorHandler');
const router = require('./routes/index');

const app = express();

const corsOptions = { origin: '*' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use(errorHandler);


module.exports = app;
