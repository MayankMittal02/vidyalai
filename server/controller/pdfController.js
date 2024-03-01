const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const PDF = require('../models/PDF');
const { StatusCodes } = require('http-status-codes')
const { PDFDocument } = require('pdf-lib')



const uploadPDF = async (req, res) => {

    console.log("first")
    const fileName = req.files.pdf.name
    const result = await cloudinary.uploader.upload(
        req.files.pdf.tempFilePath, {
        use_filename: false,
        folder: 'vidyalai'
    }
    );
    await fs.unlinkSync(req.files.pdf.tempFilePath);
    await PDF.create({
        name: fileName,
        source: result.secure_url,
        createdBy: req.user.userId,
        pages: result.pages

    })
    console.log("second")

    res.status(StatusCodes.CREATED).json({ message: "PDF Uploaded", link:result.secure_url })
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

const createPDF = async (req, res) => {

    try {
        const filePath = req.files.pdf.tempFilePath;
        const { selectedPages } = req.body

        const pdfBytes = await fs.readFile(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const newPdfDoc = await PDFDocument.create();
        for (const pageNumber of selectedPages) {
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
            newPdfDoc.addPage(copiedPage);
        }
        const newPdfBytes = await newPdfDoc.save();
        res.contentType("application/pdf");

        res.write(newPdfBytes)
        res.send()
    }

    catch (error) {
        res.send(error)
    }


}



module.exports = {
    uploadPDF, getPDF, getAllPDF, createPDF
}