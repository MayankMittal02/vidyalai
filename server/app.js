require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
const app = express()

const fileUpload = require('express-fileupload');
const cors = require('cors')


const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const connectDB = require('./db/connect');

app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
const {uploadPDF} = require('./controller/uploadController')
const authRouter = require('./routes/authRoutes')
const uploadRouter = require('./routes/uploadRoutes')





app.use('/auth' ,authRouter)
app.use('/uploadpdf' , uploadRouter)

app.get('/', (req, res) => {
    res.send('<h1>File Upload Starter</h1>');
});



// app.post('/' , uploadPDF)







const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};
start();
