const express = require('express')
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware')

const {uploadPDF , getAllPDF , getPDF,createPDF} = require('../controller/pdfController')

router.route('/uploadpdf').post(authenticateUser , uploadPDF)
router.route('/getpdf').get(authenticateUser,getAllPDF)
router.route('/getpdf/:pdfId').get(authenticateUser , getPDF)
router.route('/createpdf').post(createPDF)

module.exports = router