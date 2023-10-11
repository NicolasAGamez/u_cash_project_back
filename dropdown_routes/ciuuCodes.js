const express = require('express');
const router = express.Router();
const axios = require('axios');
const app = express();

// GET API para obtener los códigos CIIU
router.get('/ciiu-codes', async (req, res) => {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/NicolasAGamez/CountryCodes/master/outputt.json');
        const data = response.data;

        const mobileCodes = data.map(item => ({
            line: item.line
        }));

        return res.status(200).json(mobileCodes);
    } catch (error) {
        console.error('Error al recuperar códigos CIIU:', error);
        return res.status(500).json({ error: 'Error al recuperar códigos CIIU' });
    }
});

module.exports = router;