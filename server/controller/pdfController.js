const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const PDF = require('../models/PDF');
const { StatusCodes } = require('http-status-codes')



const uploadPDF = async (req, res) => {

    const fileName = req.files.pdf.name
    const result = await cloudinary.uploader.upload(
        req.files.pdf.tempFilePath, {
        use_filename: false,
        folder: 'vidyalai'
    }
    );
    console.log(result)
    fs.unlinkSync(req.files.pdf.tempFilePath);
    await PDF.create({
        name: fileName,
        source: result.secure_url,
        createdBy: req.user.userId,
        pages: result.pages

    })
    res.status(StatusCodes.CREATED).json({ message: "PDF Uploaded" })
}

const getPDF = async (req, res) => {
    const { pdfId } = req.params
    const pdf = await PDF.findOne({ _id: pdfId, createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ pdf })

}

const getAllPDF = async (req, res) => {
    let result = await PDF.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ result })
}



module.exports = {
    uploadPDF,getPDF , getAllPDF
}