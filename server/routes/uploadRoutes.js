const express = require('express')
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware')

const {uploadPDF} = require('../controller/uploadController')

router.route('/').post(authenticateUser , uploadPDF)

module.exports = router