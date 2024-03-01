import React, { useState } from 'react'
import { uploadPDF } from '../apicalls/pdf'


function Uploadpdf() {

  const [file, setFile] = useState(null)

  function handleFileChange(e) {
    setFile(e.target.files[0])
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await uploadPDF(formData)
    } catch (error) {
      console.error('Error uploading file: ', error);
    }

  }


  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Upload</button>
      </div>

      {/* <Form onFinish={onFinish}>
        <Form.Item name="pdf">
          <input type="file" accept='.pdf' />
        </Form.Item>
        <button type='submit'>upload pdf</button>
      </Form> */}
    </>
  )
}

export default Uploadpdf