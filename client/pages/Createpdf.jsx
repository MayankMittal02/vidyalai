import React from "react";
import { useState } from "react";
import { createPDF } from "../apicalls/pdf";

function Createpdf({ pages, file }) {
  console.log(file);

  const [link, setLink] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [order, setOrder] = useState("")

  const handleDownload = () => {
    window.open(link, "_blank");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("selectedPages", selectedPages);
      // formData.append('order' , order)
      const response = await createPDF(formData);
      setLink(response.data.link);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckboxChange = (event) => {
    setLoading(true);
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedPages([...selectedPages, value]);
    } else {
      setSelectedPages(selectedPages.filter((item) => item !== value));
    }
  };

  const checkboxes = [];
  for (let i = 1; i <= pages; i++) {
    checkboxes.push(
      <li
        key={i}
        class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
      >
        <div class="flex items-center ps-3">
          <input
            type="checkbox"
            value={i}
            onChange={handleCheckboxChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="vue-checkbox"
            class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Page {i}
          </label>
        </div>
      </li>
    );
  }

  return (
    <>
      <div className="items-center w-full font-semibold rounded-md">
        <h3 class="font-semibold mb-2 text-gray-900 dark:text-white">
          Select Pages:
        </h3>

        <ul class="text-sm mb-2 px-4 py-2  gap-x-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {checkboxes}
        </ul>

        <div className="w-full flex gap-2 ">
          <button
            onClick={handleSubmit}
            className="p-2 bg-black w-1/2 items-center justify-center text-white font-medium rounded-md hover:bg-white hover:text-black duration-100 transition-all hover:border-2 border-2 hover:border-black"
          >
            Create
          </button>
          {loading === false ? (
            <button
              onClick={handleDownload}
              className="p-2 bg-black w-1/2 items-center justify-center text-white font-medium rounded-md hover:bg-white hover:text-black duration-100 transition-all hover:border-2 border-2 hover:border-black"
            >
              Download
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Createpdf;
