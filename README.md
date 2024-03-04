# PDF Page Extractor
This web application allows users to upload a PDF file, select specific pages from it, and create a new PDF containing only the selected pages.


## Features
### Functionalities
- Users can upload a PDF file using a simple form. File validation ensures that only PDF files are accepted.
- Users get a visual representation of all pages in the uploaded PDF. Users can select which pages they want to extract through checkboxes.
- Users can create a new PDF containing the selected pages with the click of a button.
- Once the new PDF is created, a download link is provided to the user.
- Users can see their previously uploaded PDF files.

## Getting Started
1. Clone the repository
2. Frontend Setup
   - Install dependencies
   - Build the frontend
3. Backend Setup
   - Install dependencies
   - Start the server
  
Copy the following code and paste in terminal
``` bash
git clone https://github.com/MayankMittal02/vidyalai.git
cd vidyalai
cd client
npm i
npm run build
cd..
cd client
npm i
nodemon app.js
```

## Usage
1. Open your browser and go to http://localhost:3000.
2. Register or Login with Demo Credentials
   - Email : ```test@test.com```
   - Password : ```test```
3. Choose a PDF file and Click on Upload
4. Select pages for the new PDF file and click on create
5. Click on Download to download new PDF.

## Technologies Used
### Frontend : 
- React
- Vite
- Tailwind CSS
- ### Backend :
- NodeJs
- ExpressJs
- Mongoose
## Contributors
- Mayank Mittal

