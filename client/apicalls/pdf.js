// const { default: axiosInstance } = require(".");
import axiosInstance from './index'

export const uploadPDF = async (payload) => {
    const response = await axiosInstance.post('/pdf/uploadpdf' , payload);
    return response;
}