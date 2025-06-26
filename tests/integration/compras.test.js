const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Cliente = require('../../src/models/Cliente');
const Produto = require('../../src/models/Produto');
const Compra = require('../../src/models/Compra');

let cliente, produto, token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST);
  
  cliente = await Cliente.create({
    nome: 'Teste Cliente',
    email: 'teste@cliente.com',
    senha: 'senha123'
  });
  
  produto = await Produto.create({
    nome: 'Produto Teste',
    descricao: 'Descrição do produto teste',
    preco: 100
  });
  
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'teste@cliente.com',
      senha: 'senha123'
    });
  
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /api/v1/compras', () => {
  it('deve criar uma nova compra', async () => {
    const res = await request(app)
      .post('/api/v1/compras')
      .set('Authorization', `Bearer ${token}`)
      .send({
        produtoId: produto._id
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('status', 'pendente');
  });

  it('não deve criar compra sem autenticação', async () => {
    const res = await request(app)
      .post('/api/v1/compras')
      .send({
        produtoId: produto._id
      });
    
    expect(res.statusCode).toEqual(401);
  });
});

describe('GET /api/v1/compras', () => {
  it('deve retornar compras do cliente autenticado', async () => {
    const res = await request(app)
      .get('/api/v1/compras')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});