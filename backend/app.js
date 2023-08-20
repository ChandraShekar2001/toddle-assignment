const express = require('express');
const app = express();
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require('./routes/userRoutes');
const journalRouter = require('./routes/journalRoutes');
const feedRouter = require('./routes/feedRoutes');

app.use(cors())
app.use(express.json())


app.use('/api/v1', userRouter);
app.use('/api/v1', journalRouter);
app.use('/api/v1', feedRouter);



module.exports = app;