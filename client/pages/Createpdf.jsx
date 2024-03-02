import React from 'react'
import { useState } from 'react';
import { createPDF } from '../apicalls/pdf';

function Createpdf({ pages, file }) {
  console.log(file)

  const [link, setLink] = useState(null)
  const [selectedPages, setSelectedPages] = useState([])
  const [loading, setLoading] = useState(true)
  // const [order, setOrder] = useState("")

  const handleDownload = () => {
    window.open(link, '_blank');
  };


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('selectedPages', selectedPages)
      // formData.append('order' , order)
      const response = await createPDF(formData)
      setLink(response.data.link)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCheckboxChange = (event) => {
    setLoading(true)
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
        {/* <p>
          Type order for pages seperated by commas (no spaces) Default:normal in original pdf
        </p>
        <input type="text" onChange={(e)=>setOrder(e.target.value)} value={order}/> */}
        <button onClick={handleSubmit}>create</button>

      </div>
      {loading === false ? <button onClick={handleDownload}>Download</button> : null}
    </>
  )
}

export default Createpdf
