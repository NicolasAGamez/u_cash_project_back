const express = require('express');
const router = express.Router();
const axios = require('axios');
const app = express();

// GET API para obtener la información de los códigos internacionales para celulares
router.get('/international-codes', async (req, res) => {
    try {
      const response = await axios.get('https://cuik-projects.github.io/country-list/countries.json');
      const countries = response.data;
  
      const mobileCodes = countries.map(country => ({
        name: country.name,
        dial_code: country.dial_code,
        code: country.code,
        emoji: country.emoji
      }));
  
      return res.status(200).json(mobileCodes);
    } catch (error) {
      console.error('Error al recuperar códigos móviles internacionales:', error);
      return res.status(500).json({ error: 'Error al recuperar códigos móviles internacionales' });
    }
  });

module.exports = router;