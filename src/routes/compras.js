const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/compras.controller');

// POST /compras - Cadastrar compra
router.post('/', comprasController.registrarCompra);

// GET /compras - Listar todas as compras - com filtro por cliente
router.get('/', comprasController.listarCompras);

module.exports = router;