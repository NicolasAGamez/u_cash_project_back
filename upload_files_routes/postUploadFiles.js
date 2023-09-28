const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const mysql = require('mysql2');
const cors = require('cors');

// Configuration of the MySQL database
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'eHrZp*H0358w',
  database: 'u_cash_customers',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the server:', err);
  } else {
    console.log('Connection to the UploadFilesPOST MySQL server established!');
  }
});

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
    destination:'uploads',
    filename: function(req, file, callback){
      const extension = file.originalname.split(".").pop()
      callback(null, `${file.fieldname}-${Date.now()}.${extension}`)
    }
    
})

const upload = multer({storage:storage})

router.use(cors())

// POST UPLOAD FILES API
router.post('/upload', upload.array('files'), async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile:
        'C:/Users/Nizaru/Downloads/ILAB/U-CASH/database-project/upload_files_routes/apikey.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({
      version: 'v3',
      auth,
    });

    const uploadedFiles = [];

    // Obtener el nombre de la carpeta desde la solicitud
    const folderName = req.body.folderName || 'Prueba'; // Valor predeterminado "Prueba" si no se proporciona

    // Buscar si ya existe una carpeta con el mismo nombre
    const existingFolders = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
    });

    let folderMetadata;

    if (existingFolders.data.files.length > 0) {
      // Use the first existing folder with the same name
      folderMetadata = existingFolders.data.files[0];
    } else {
      // Create a new folder with the specified name if it doesn't exist
      folderMetadata = await drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: ['1cSmIynY00SUPWBCWeI7LKW0vyOBAwiBJ'], // ID de la carpeta padre
        },
      });

      // Una vez creada la carpeta, puedes obtener su metadata nuevamente para asegurarte de tener el ID
      folderMetadata = folderMetadata.data;
    }

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      console.log('File path:', file.path);

      const response = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimeType,
          parents: [folderMetadata.id], // ID de la carpeta
        },

        media: {
          body: fs.createReadStream(file.path),
        },
      });
      uploadedFiles.push(response.data);
    }

    // Generate the URL of the folder where files were saved
    const folderUrl = 'https://drive.google.com/drive/folders';

    console.log('Uploaded files:', uploadedFiles);
    console.log('Folder ID:', folderMetadata.id);

    // Concatenate folderUrl and folderMetadata.id into a single variable
    const folderUrlWithId = folderUrl + '/' + folderMetadata.id;
    console.log('Folder URL:', folderUrlWithId);

    // Insertar detalles en la base de datos
    const nameFolder = req.body.folderName || 'Prueba';
  
    // Configura la conexión de base de datos
    const dbConnection = await mysql.createConnection(dbConfig);

    // Inserta los detalles en la tabla documents
    await dbConnection.execute(
      'INSERT INTO documents (name, url_documents) VALUES (?, ?)',
      [nameFolder, folderUrlWithId]
    );

    // Cierra la conexión de base de datos
    await dbConnection.end();

    res.json({ files: uploadedFiles, folderUrlWithId }); // Include the folder URL in the response
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;