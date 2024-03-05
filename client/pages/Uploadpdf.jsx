import React, { useState } from "react";
import { uploadPDF } from "../apicalls/pdf";
import Createpdf from "./Createpdf";
import { message } from "antd";

function Uploadpdf({ onUpload }) {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState(0);
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
    setLoading(true);
    setLoader(false);
  }

  async function handleSubmit(e) {
    if (!file) {
      message.error("Please choose a PDF file to uplaod");
      return;
    }
    setLoader(true);
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await uploadPDF(formData);
      setPages(response.data.pages);
      setLink(response.data.link);
      onUpload();
    } catch (error) {
      if (error?.response?.data?.message) {
        message.error(error.response.data.message);
        setLoader(false);
      }
      else{
        message.error("Something went Wrong")
        setLoader(false);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="w-full items-center justify-center flex-col">
        <div className="p-2 rounded-md flex justify-center mb-2 mt-4 items-center bg-sky-100 ">
          <input
            type="file"
            onChange={handleFileChange}
            className=""
            accept=".pdf"
          />
          <button
            onClick={handleSubmit}
            // disabled={handleDisable}
            className="p-2 bg-black text-white font-medium rounded-md hover:bg-white hover:text-black duration-100 transition-all hover:border-2 border-2 hover:border-black"
          >
            Upload
          </button>
        </div>
        {loader ? (
          <div className="bg-slate-400 min-h-96 justify-center items-center rounded-md flex gap-4 p-4">
            {loading ? (
              <p className="flex-col gap-2 items-center align-middle justify-center">
                <img
                  src="..\loading.png"
                  className="h-16 animate-spin"
                  alt="Loading ..."
                />
              </p>
            ) : (
              <iframe src={link} height={400} width={400} className="" />
            )}
            {loading ? null : <Createpdf pages={pages} file={file}></Createpdf>}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Uploadpdf;
