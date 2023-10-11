const express = require('express');
const app = express();

app.use(express.json());

const process = require('process');
require('dotenv').config();

const PORT = process.env.PORT ?? '3001';
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use('*', (req, res) => {
    res.status(200).json({ 
        date: new Date().toISOString(),
        message: 'Hello World !',
        version: '1.0.0',
    });
});