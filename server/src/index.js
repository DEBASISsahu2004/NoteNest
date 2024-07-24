const express = require('express');
const app = express();
require('dotenv').config();
require('./db');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const {auth} = require("./middleware/auth.middleware");
const userRouter = require('./routers/users.router');
const authRouter = require('./routers/auth.router');
const notesRouter = require('./routers/notes.router');

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/notes', auth, notesRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 7070;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});