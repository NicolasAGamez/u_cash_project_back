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
  host: 'demo-umonei-aws.cbg6k7u60pgo.us-east-2.rds.amazonaws.com',
  port: 3306,
  user: 'root',
  password: 'eHrZp*H0358w',
  database: 'db_demo_umonei',
};

// Establecer conexión con el servidor MySQL
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the server:', err);
  } else {
    console.log('Conexión DeleteUploadFiles realizada');
  }
});

// DELETE API para borrar los datos de los documentos subidos a Google Drive por Url
router.delete('/delete-document/:url_documents', async (req, res) => {
    try {
      const urlDocumentsToDelete = req.params.url_documents;
  
      // Configurar la autenticación de Google Drive
      const auth = new google.auth.GoogleAuth({
        keyFile: 'C:/Users/Nizaru/Downloads/ILAB/U-CASH/database-project/upload_files_routes/apikey.json',
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
  
      const drive = google.drive({
        version: 'v3',
        auth,
      });
  
      // Recuperar el ID del archivo o carpeta en Google Drive
      const driveResponse = await drive.files.list({
        q: `trashed=false and '${urlDocumentsToDelete}' in parents`,
        fields: 'files(id)',
      });
  
      if (driveResponse.data.files.length > 0) {
        const fileIdToDelete = driveResponse.data.files[0].id;
  
        // Eliminar el archivo o carpeta de Google Drive
        await drive.files.delete({
          fileId: fileIdToDelete,
        });
  
        // Configurar la conexión de la base de datos
        const dbConnection = await mysql.createConnection(dbConfig);
  
        // Eliminar el registro de la base de datos
        const [result] = await dbConnection.execute(
          'DELETE FROM documents WHERE url_documents = ?',
          [urlDocumentsToDelete]
        );
  
        // Cerrar la conexión de la base de datos
        await dbConnection.end();
  
        if (result.affectedRows > 0) {
          res.json({ message: `Archivo o carpeta con URL '${urlDocumentsToDelete}' eliminado correctamente.` });
        } else {
          res.status(404).json({ error: `No se encontró un archivo o carpeta con URL '${urlDocumentsToDelete}'.` });
        }
      } else {
        res.status(404).json({ error: `No se encontró un archivo o carpeta con URL '${urlDocumentsToDelete}' en Google Drive.` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Ocurrió un error al eliminar el archivo o carpeta.' });
    }
  });
  
  module.exports = router;