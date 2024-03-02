import axiosInstance from './index'

export const uploadPDF = async (payload) => {
    const response = await axiosInstance.post('/pdf/uploadpdf' , payload);
    return response;
}

export const createPDF = async (payload)=>{
    axiosInstance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    const response = await axiosInstance.post('pdf/createpdf' , payload)
    return response
}