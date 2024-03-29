require('dotenv').config();

const cors = require('cors');
const express = require('express');

const errorHandler = require('./src/app/Middlewares/ErrorHandler');

const router = require('./src/routes');

const app = express();

const corsOptions = { origin: '*' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use(errorHandler);


module.exports = app;
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
