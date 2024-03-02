const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
const PDF = require('../models/PDF');
const { StatusCodes } = require('http-status-codes')
const { PDFDocument } = require('pdf-lib')



const uploadPDF = async (req, res) => {


    if (req.files.pdf.mimetype !== 'application/pdf') {
        return res.status(400).json({ message: 'Only PDF files are allowed.' });
    }

    const fileName = req.files.pdf.name
    const result = await cloudinary.uploader.upload(
        req.files.pdf.tempFilePath, {
        use_filename: false,
        folder: 'vidyalai'
    }
    );
    await fs.unlink(req.files.pdf.tempFilePath);
    await PDF.create({
        name: fileName,
        source: result.secure_url,
        createdBy: req.user.userId,
        pages: result.pages

    })

    res.status(StatusCodes.CREATED).json({ message: "PDF Uploaded", pages: result.pages,link:result.secure_url })
}

const getPDF = async (req, res) => {
    const { pdfId } = req.params
    const pdf = await PDF.findOne({ _id: pdfId, createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ pdf })

}

const getAllPDF = async (req, res) => {
    let results = PDF.find({ createdBy: req.user.userId })
    results.sort('-createdAt')
    const result = await results
    res.status(StatusCodes.OK).json({ result })
}

const createPDF = async (req, res) => {

    try {
        const filePath = req.files.pdf.tempFilePath;
        var { selectedPages } = req.body
        selectedPages = selectedPages.split(',').map(item => parseInt(item))
        selectedPages.sort()

        // if(order !==""){
        //     order = order.split(',').map(item => parseInt(item))
        //     console.log(order)
        //     selectedPages = order

        // }

        const pdfBytes = await fs.readFile(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const newPdfDoc = await PDFDocument.create();
        for (const pageNumber of selectedPages) {
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
            newPdfDoc.addPage(copiedPage);
        }
        const newPdfBytes = await newPdfDoc.save();
        editedPdfPath = './tmp/editedpdf.pdf'
        await fs.writeFile(editedPdfPath, newPdfBytes)


        const result = await cloudinary.uploader.upload(
            path.resolve('././tmp/editedpdf.pdf'), {
            use_filename: false,
            folder: 'vidyalai'
        }
        );
        await fs.unlink(editedPdfPath);
        await fs.unlink(filePath);

        res.status(StatusCodes.CREATED).json({ link: result.secure_url })
    }

    catch (error) {
        res.send(error)
    }


}



module.exports = {
    uploadPDF, getPDF, getAllPDF, createPDF
}