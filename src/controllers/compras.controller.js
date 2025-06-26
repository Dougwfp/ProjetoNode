const Compra = require('../models/compra.model');
const Cliente = require('../models/cliente.model');
const Produto = require('../models/produto.model');

// Cadastrar compra
exports.registrarCompra = async (req, res) => {
  try {
    const { cliente_id, produto_id } = req.body;
    
    const cliente = await Cliente.findById(cliente_id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    
    const produto = await Produto.findById(produto_id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    
    const novaCompra = new Compra({ cliente_id, produto_id });
    await novaCompra.save();
    
    const compraCompleta = await Compra.findById(novaCompra._id)
      .populate('cliente_id', 'nome email')
      .populate('produto_id', 'nome preco');
    
    res.status(201).json(compraCompleta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar todas as compras - filtro por cliente
exports.listarCompras = async (req, res) => {
  try {
    const { cliente_id } = req.query;
    let filtro = {};
    
    if (cliente_id) {
      filtro.cliente_id = cliente_id;
    }
    
    const compras = await Compra.find(filtro)
      .populate('cliente_id', 'nome email')
      .populate('produto_id', 'nome preco');
    
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};