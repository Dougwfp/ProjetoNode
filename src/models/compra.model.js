const mongoose = require('mongoose');

const CompraSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: [true, 'Cliente é obrigatório']
  },
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto',
    required: [true, 'Produto é obrigatório']
  },
  dataCompra: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pendente', 'completa', 'cancelada'],
    default: 'pendente'
  }
});

CompraSchema.index({ cliente: 1, produto: 1 });

module.exports = mongoose.model('Compra', CompraSchema);