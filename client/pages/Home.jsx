import axiosInstance from "../apicalls";
import React, { useEffect, useState } from "react";
import Uploadpdf from "./Uploadpdf.jsx";
import { Navigate } from "react-router-dom";
import Footer from "./Footer.jsx";

function Home() {
  const isAuthenticated = localStorage.getItem("token");

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/pdf/getpdf");
      setData(response.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-slate-500 min-h-screen">
        <div className="p-2 items-center w-3/4 flex justify-center">
          {isAuthenticated ? (
            <div className="w-full ">
              <Uploadpdf onUpload={fetchData} />
              <div className=" bg-slate-400 flex flex-col w-full items-center justify-center my-4 rounded-md">
                <div className="text-lg font-semibold py-6">
                  Your Saved PDF:
                </div>
                <ul className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mb-6">
                  {data.map((item) => (
                    <li key={item._id} className="">
                      <a
                        href={item.source}
                        target="_blank"
                        className="block max-w-sm p-2 bg-slate-200 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                          {item.name}
                        </h5>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        </div>

        <div className="mt-2 mb-4 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
