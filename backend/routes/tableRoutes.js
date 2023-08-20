const express = require('express');
const router = express.Router();

const {getTableData} = require('../controllers/tableController')


router.route('/table/:table').get(getTableData);

module.exports = router;
