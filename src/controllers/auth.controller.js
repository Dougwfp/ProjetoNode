const jwt = require('jsonwebtoken');
const Cliente = require('../models/Cliente');
const AppError = require('../utils/AppError');
const { signToken } = require('../middlewares/auth');

exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return next(new AppError('Por favor informe email e senha', 400));
    }

    const cliente = await Cliente.findOne({ email }).select('+senha');

    if (!cliente || !(await cliente.compararSenha(senha, cliente.senha))) {
      return next(new AppError('Email ou senha incorretos', 401));
    }

    const token = signToken(cliente._id);

    res.status(200).json({
      status: 'success',
      token
    });
  } catch (err) {
    next(err);
  }
};