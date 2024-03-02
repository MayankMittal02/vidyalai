import { createPDF } from "../apicalls/pdf";

export const sendStoredPdfToBackend = async (selectedPages, file) => {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('selectedPages', selectedPages)

    const response = await createPDF(formData)
    return response

}