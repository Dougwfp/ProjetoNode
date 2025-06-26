const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos.controller');

// POST /produtos - Cadastrar  produto
router.post('/', produtosController.cadastrarProduto);

// GET /produtos - Listar todos os produtos - com filtro de preço
router.get('/', produtosController.listarProdutos);

module.exports = router;