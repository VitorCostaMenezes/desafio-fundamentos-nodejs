import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

// Criando uma instancia de Trasactions repository
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  // Trantando os erros
  try {
    // acessando o metodo all e atribuindo o valor a variavel trasactions
    const transactions = transactionsRepository.all();

    // obtendo o valor do balance através do metodo getBalnace
    const balance = transactionsRepository.getBalance();

    // retornando um objeto com valor das trasactions e do balance
    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// acessando o metodo post
transactionRouter.post('/', (request, response) => {
  try {
    // recebendo os valores do corpo do body
    const { title, value, type } = request.body;

    // Instanciando a classe CreateTransactions
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // Executando o metodo execute passando os valores abaixo como parâmetro
    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    // retornando uma resposta
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
