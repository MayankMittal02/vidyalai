import React, { useEffect } from 'react'
import { useState } from 'react';
import { uploadPDF } from '../apicalls/pdf';
import { PDFDocument } from 'pdf-lib'
import { sendStoredPdfToBackend } from '../utils/sendpdf';

function Createpdf({ pages,file }) {
  console.log(file)

  const [link, setLink] = useState(null)
  const [selectedPages, setSelectedPages] = useState([])
  const [loading, setLoading] = useState(true)

  const handleDownload = () => {
    // Replace 'path_to_your_file' with the actual path to your file
    const fileUrl = link;
    window.open(fileUrl, '_blank');
  };


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true)
      const respone = await sendStoredPdfToBackend(selectedPages,file)
      setLink(respone.data.link)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }

  }

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedPages([...selectedPages, value]);
    } else {
      setSelectedPages(selectedPages.filter(item => item !== value));
    }
  };

  const checkboxes = [];
  for (let i = 1; i <= pages; i++) {
    checkboxes.push(
      <div key={i}>
        <input type="checkbox" value={i} onChange={handleCheckboxChange} />
        Page {i}<br />
      </div>
    );
  }

  return (
    <>
      <div>
        select pages:
        {checkboxes}


        <button onClick={handleSubmit}>create</button>
      </div>

      {/* {link && <button onClick={handleDownload}>Download</button>} */}
      {loading === false ? <button onClick={handleDownload}>Download</button>:null}




    </>
  )
}

export default Createpdf
