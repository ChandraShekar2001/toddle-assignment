const express = require('express');
const app = express();
const cors = require("cors");

const userRouter = require('./routes/userRoutes');
const journalRouter = require('./routes/journalRoutes');
const feedRouter = require('./routes/feedRoutes');
const tableRouter = require('./routes/tableRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/v1', userRouter);
app.use('/api/v1', journalRouter);
app.use('/api/v1', feedRouter);
app.use('/api/v1', tableRouter);

app.get('/', (req, res) => {
    res.send("Welcome to the landing page!");
})


module.exports = app;