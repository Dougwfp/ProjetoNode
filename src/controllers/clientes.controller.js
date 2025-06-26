const Cliente = require('../models/cliente.model');

// Cadastrar cliente
exports.cadastrarCliente = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    const clienteExistente = await Cliente.findOne({ email });
    if (clienteExistente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const novoCliente = new Cliente({ nome, email, senha });
    await novoCliente.save();
    
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().select('-senha');
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};