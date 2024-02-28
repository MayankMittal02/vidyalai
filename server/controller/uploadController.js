const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const PDF = require('../models/PDF');
const jwt = require('jsonwebtoken')

// const User = require('../models/User')

const uploadPDF = async (req, res) => {
    // console.log(req.headers.authorization)

    tokenn = jwt.verify(req.headers.authorization , "jwtsecret")
    // console.log(tokenn)
    createdBy = tokenn.userId

    const fileName = req.files.pdf.name
    const result = await cloudinary.uploader.upload(
        req.files.pdf.tempFilePath, {
        use_filename: false,
        folder: 'vidyalai'
    }
    );
    fs.unlinkSync(req.files.pdf.tempFilePath);
    await PDF.create({
        name:fileName,
        source:result.secure_url,
        createdBy

    })
    res.send({
        name:fileName,
        source:result.secure_url,
        createdBy
    })



}



module.exports = {
    uploadPDF
}