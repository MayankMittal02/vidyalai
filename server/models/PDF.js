const mongoose = require('mongoose')

const PDFSchema = new mongoose.Schema({
    name: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    source: {
        type: String,
        required: true
    },

    pages: Number,
    createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model("PDF", PDFSchema);