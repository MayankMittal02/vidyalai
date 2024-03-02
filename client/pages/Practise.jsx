import React, { useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setMessage('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Upload PDF File</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept=".pdf" />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
            {selectedFile && (
                <div>
                    <Document
                        file={selectedFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {[...Array(numPages).keys()].map((pageNumber) => (
                            <Page
                                key={pageNumber + 1}
                                pageNumber={pageNumber + 1}
                                width={250}
                            />
                        ))}
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
