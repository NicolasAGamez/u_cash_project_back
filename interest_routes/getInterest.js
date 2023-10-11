const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

// GET API para obtener la información de la tasa de usura y otros intereses
router.get('/interest-rates', async (req, res) => {
    try {
        const url = 'https://www.larepublica.co/indicadores-economicos/bancos/tasa-de-usura';
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const rateSpan = $('#vue-container > div.InternaIndicadores > div > div.flex-grow-1.wrapContentBody > div > div > div.grid-container > div > div > div.d-flex.CardDetailIndicator.multiple > div > div:nth-child(1) > div.priceIndicator.down > div > div.flex-grow-1 > span.price');

        if (rateSpan.length > 0) {
            const rateText = rateSpan.text().trim();
            const numericValue = rateText.replace(',', '.').replace('%', '');
            const originalRate = parseFloat(numericValue);
            const creditInterest = (originalRate - 2.0) / 100.0;
            const monthlyCreditInterest = creditInterest / 12;
            const betweenness = monthlyCreditInterest / 2;
            const administration = 0.01;
            const ivaAdministration = 0.19;

            const interestRates = {
                creditInterest,
                monthlyCreditInterest,
                betweenness,
                administration,
                ivaAdministration
            };

            return res.status(200).json(interestRates);
        } else {
            return res.status(404).json({ error: 'Tasa de interés no encontrada' });
        }
    } catch (error) {
        console.error('Error al recuperar tasas de interés:', error);
        return res.status(500).json({ error: 'Error al recuperar tasas de interés' });
    }
});

module.exports = router;