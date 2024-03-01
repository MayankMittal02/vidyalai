import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

function PdfUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check if the file type is PDF
        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file.');
            return;
        }

        setSelectedFile(file);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const togglePageSelection = (pageNumber) => {
        const index = selectedPages.indexOf(pageNumber);
        if (index === -1) {
            setSelectedPages([...selectedPages, pageNumber]);
        } else {
            setSelectedPages(selectedPages.filter((page) => page !== pageNumber));
        }
    };

    const renderPageCheckboxes = () => {
        const checkboxes = [];
        for (let i = 1; i <= numPages; i++) {
            checkboxes.push(
                <label key={i}>
                    <input
                        type="checkbox"
                        checked={selectedPages.includes(i)}
                        onChange={() => togglePageSelection(i)}
                    />
                    Page {i}
                </label>
            );
        }
        return checkboxes;
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".pdf" />
            {selectedFile && (
                <div>
                    <Document
                        file={selectedFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {/* {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))} */}
                    </Document>
                    {/* <div>
                        <h3>Select pages to extract:</h3>
                        {renderPageCheckboxes()}
                    </div> */}
                </div>
            )}
        </div>
    );
}

export default PdfUploader;
