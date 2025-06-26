const Produto = require('../models/produto.model');

// Cadastrar produto
exports.cadastrarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;
    
    const novoProduto = new Produto({ nome, descricao, preco });
    await novoProduto.save();
    
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar todos os produtos - filtro de preço
exports.listarProdutos = async (req, res) => {
  try {
    const { preco_min, preco_max } = req.query;
    let filtro = {};
    
    if (preco_min && preco_max) {
      filtro.preco = { $gte: Number(preco_min), $lte: Number(preco_max) };
    } else if (preco_min) {
      filtro.preco = { $gte: Number(preco_min) };
    } else if (preco_max) {
      filtro.preco = { $lte: Number(preco_max) };
    }
    
    const produtos = await Produto.find(filtro);
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};