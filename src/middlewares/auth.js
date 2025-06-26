const jwt = require('jsonwebtoken');
const Cliente = require('../models/Cliente');
const AppError = require('../utils/AppError');

// Gerar token JWT
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Autenticação
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Você não está logado. Por favor faça login para ter acesso.', 401));
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const currentCliente = await Cliente.findById(decoded.id);
    if (!currentCliente) {
      return next(new AppError('O cliente pertencente a este token não existe mais.', 401));
    }

    req.cliente = currentCliente;
    next();
  } catch (err) {
    next(err);
  }
};