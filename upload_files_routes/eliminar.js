const express = require('express');
const { google } = require('googleapis');
const router = express.Router();
const fs = require('fs');

// Configuration of the MySQL database
const dbConfig = {
  host: 'demo-umonei-aws.cbg6k7u60pgo.us-east-2.rds.amazonaws.com',
  port: 3306,
  user: 'root',
  password: 'eHrZp*H0358w',
  database: 'db_demo_umonei',
};

// Servicio DELETE para eliminar un archivo o carpeta de Google Drive
router.delete('/eliminar/:url_documents', async (req, res) => {
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

      // Eliminar la carpeta y su contenido de Google Drive
      await drive.files.delete({
        fileId: fileIdToDelete,
      });

      res.json({ message: `Carpeta con URL '${urlDocumentsToDelete}' eliminada correctamente de Google Drive.` });
    } else {
      res.status(404).json({ error: `No se encontró una carpeta con URL '${urlDocumentsToDelete}' en Google Drive.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar la carpeta de Google Drive.' });
  }
});

module.exports = router;