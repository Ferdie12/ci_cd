var express = require('express');
var router = express.Router();
const base = require('../controllers/baseController');

/* GET home page. */
router.get('/', base.index);
router.post('/sum', base.sum);

module.exports = router;
