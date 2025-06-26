const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');

// POST /clientes - Cadastrar cliente
router.post('/', clientesController.cadastrarCliente);

// GET /clientes - Listar todos os clientes
router.get('/', clientesController.listarClientes);

module.exports = router;