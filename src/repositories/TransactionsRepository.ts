import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  // criando uma especie de if
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // retornando o valor de trasactions
    return this.transactions;
  }

  public getBalance(): Balance {
    // utilizando a função reduce para obter o valor da soma dos types
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // Instanciando a classe Transaction
    // essa class possui o modulo do arquivo de dados
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    // salvando o novo valor inserido na variavel que simula o banco
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
