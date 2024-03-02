import React, { useState } from 'react'
import { uploadPDF } from '../apicalls/pdf'
import Createpdf from './Createpdf'


function Uploadpdf() {

  const [file, setFile] = useState(null)
  const [pages, setPages] = useState(0)

  function handleFileChange(e) {
    setFile(e.target.files[0])
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);

    try {

      const response = await uploadPDF(formData)
      setPages(response.data.pages)
    } catch (error) {
      console.error('Error uploading file: ', error);
    }

  }


  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} accept='.pdf'/>
        <button onClick={handleSubmit}>Upload</button>
      </div>
      {pages > 0 ? <Createpdf pages={pages} file={file}></Createpdf> : null}


    </>
  )
}

export default Uploadpdf