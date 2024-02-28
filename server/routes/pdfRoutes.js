const express = require('express')
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware')

const {uploadPDF , getAllPDF , getPDF} = require('../controller/pdfController')

router.route('/uploadpdf').post(authenticateUser , uploadPDF)
router.route('/getpdf').get(authenticateUser,getAllPDF)
router.route('/getpdf/:pdfId').get(authenticateUser , getPDF)

module.exports = router