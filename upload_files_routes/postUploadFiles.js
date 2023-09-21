const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const router = express.Router(); 
const mysql = require('mysql2');

// configuración de la base de datos MySQL
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
    console.error('Error conectando con el servidor:', err);
  } else {
    console.log('Conexión con el servidor UploadFilesPOST MySQL realizada!');
  }
});

// Configuración de Multer para manejar cargas de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const scope = ['https://www.googleapis.com/auth/drive'];

// Credenciales Google Drive API 
const credentials = require('../apikey.json');
const drive = google.drive('v3');
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scope
);

// POST UPLOAD FILES API
router.get('/upload', async (req, res) => {
    try {
      // Autenticar con la API de Google Drive
      await auth.authorize();
  
      // Especifica el nombre de la carpeta del cliente (puedes reemplazarlo con el nombre real del cliente)
      const clientFolderName = 'ClientName'; 
  
      //Comprueba si la carpeta principal existe en Google Drive
      const parentFolderId = '1xLlwOuHjEAMcYNBMLxQdc9NnTSXsHTFW'; // Replace with the parent folder's ID
      const folderQuery = `'${parentFolderId}' in parents and name='${clientFolderName}' and mimeType='application/vnd.google-apps.folder'`;
      const folderResponse = await drive.files.list({
        auth,
        q: folderQuery,
        fields: 'files(id)'
      });
  
      let clientFolderId;
  
      // Si la carpeta no existe, la creamos
      if (folderResponse.data.files.length === 0) {
        const clientFolderMetadata = {
          name: clientFolderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [parentFolderId] 
        };
  
        const createFolderResponse = await drive.files.create({
          auth,
          resource: clientFolderMetadata,
          fields: 'id'
        });
  
        clientFolderId = createFolderResponse.data.id;
        console.log('Client folder created:', clientFolderName);
      } else {
        // La carpeta ya existe
        clientFolderId = folderResponse.data.files[0].id;
        console.log('Client folder found:', clientFolderName);
      }
  
      // Establece permisos para la carpeta para permitir que cualquier persona con el enlace pueda editar
      await drive.permissions.create({
        auth,
        fileId: clientFolderId,
        resource: {
          type: 'anyone',
          role: 'writer'
        }
      });
  
      // Lee el archivo local
      const localFilePath = path.join(__dirname, 'ioffi_Portafolio_2023_v4.pdf'); 
      const fileContent = fs.readFileSync(localFilePath);
  
      // Sube el archivo local a la carpeta del cliente en Google Drive
      const media = {
        mimeType: 'application/pdf',
        body: fs.createReadStream(localFilePath)
      };
  
      const fileMetadata = {
        name: 'ioffi_Portafolio_2023_v4.pdf', 
        parents: [clientFolderId] 
      };
  
      await drive.files.create({
        auth,
        resource: fileMetadata,
        media: media,
        fields: 'id'
      });
  
      // Responde con el ID de la carpeta
      res.status(200).json({
        parentFolderId: parentFolderId,
        clientFolderId: clientFolderId
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = router;
