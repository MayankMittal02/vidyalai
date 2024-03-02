import React, { useState } from 'react'
import { uploadPDF } from '../apicalls/pdf'
import Createpdf from './Createpdf'


function Uploadpdf() {

  const [file, setFile] = useState(null)
  const [pages, setPages] = useState(0)
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(true)


  function handleFileChange(e) {
    setFile(e.target.files[0])
    setLoading(true)
  }


  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);

    try {

      const response = await uploadPDF(formData)
      setPages(response.data.pages)
      setLink(response.data.link)
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
    setLoading(false)

  }

  function handleSeeButton(e) {
    e.preventDefault()
    window.open(link, '_blank');

  }


  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} accept='.pdf' />
        <button onClick={handleSubmit}>Upload</button>
        {loading ? null :<button onClick={handleSeeButton}>see uploaded pdf</button>}

      </div>
      {pages > 0 ? <Createpdf pages={pages} file={file}></Createpdf> : null}


    </>
  )
}

export default Uploadpdf