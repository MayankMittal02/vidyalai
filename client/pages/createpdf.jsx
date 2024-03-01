import React from 'react'
import { useState } from 'react';
import { uploadPDF } from '../apicalls/pdf';
import { PDFDocument } from 'pdf-lib'
import { sendStoredPdfToBackend } from '../utils/sendpdf';

function Createpdf() {
  const [file, setFile] = useState(null)

  function handleFileChange(e) {
    setFile(e.target.files[0])
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const respone = await sendStoredPdfToBackend()
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <>
      <div>
        {/* <input type="file" onChange={handleFileChange} /> */}
        <button onClick={handleSubmit}>create</button>
      </div>


    </>
  )
}

export default Createpdf