const express = require('express');
const router = express.Router();
const Clientes = require('../models/Clientes'); // Importa o modelo Cliente

// Rota para buscar todos os clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.findAll(); // Busca todos os clientes no banco de dados
        res.json(clientes); // Retorna os clientes em formato JSON
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna erro se algo der errado
    }
});

module.exports = router;