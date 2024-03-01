import { createPDF } from "../apicalls/pdf";

export const sendStoredPdfToBackend = async () => {
    // Retrieve PDF data from local storage
    const pdfData = localStorage.getItem('pdfData');

    if (!pdfData) {
        console.error('No PDF data found in local storage');
        return;
    }

    // Convert data URL back to Blob
    const byteCharacters = atob(pdfData.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const pdfBlob = new Blob(byteArrays, { type: 'application/pdf' });

    // Create FormData object
    const formData = new FormData();
    formData.append('pdf', pdfBlob);
    formData.append('selectedPages' ,'23' )

    const response = await createPDF(formData)
    return response

}