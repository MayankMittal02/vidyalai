const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const PDF = require('../models/PDF');
const { StatusCodes } = require('http-status-codes')


// const User = require('../models/User')

const uploadPDF = async (req, res) => {

    const fileName = req.files.pdf.name
    const result = await cloudinary.uploader.upload(
        req.files.pdf.tempFilePath, {
        use_filename: false,
        folder: 'vidyalai'
    }
    );
    fs.unlinkSync(req.files.pdf.tempFilePath);
    await PDF.create({
        name: fileName,
        source: result.secure_url,
        createdBy: req.user.userId

    })
    res.status(StatusCodes.CREATED).send("file uploaded")
}



module.exports = {
    uploadPDF
}