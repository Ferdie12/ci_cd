require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./routes');
const cors = require('cors');

const {
    HTTP_PORT = 3000
} = process.env;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(router);

app.get('/', (req,res) => {
    return res.status(200).json({
        status: true,
        message: "Test CI/CD"
    })
})

// 500
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

app.listen(HTTP_PORT, () => console.log("server is running"));

module.exports = app;