import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// criando uma interface
// definindo a tipagem
interface Request {
  title: string;
  value: number;
  // criando uma especie de if
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  // criando uma variavel privada do tipo TransactionRepository
  private transactionsRepository: TransactionsRepository;

  // O contructor incializa a variavel transactionsRepository inserindo o valor
  // que vem como parâmetro do arquivo TransactionsRepository.ts
  constructor(transactionsRepository: TransactionsRepository) {
    // atribuindo um valor a variavel privada
    this.transactionsRepository = transactionsRepository;
  }

  // recebendo os valores que vem da rota post como parâmetro
  public execute({ title, value, type }: Request): Transaction {
    // validando o valor inserido no type
    // verifica se o income ou outcome estão inclusos no type inserido
    // como tem a negação no inicio, a não inclusão deles valida o if e entra no erross
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('transaction type is invalid');
    }

    // Obtendo o valor do total do getBalanace para verificar o saldo disponivel
    const { total } = this.transactionsRepository.getBalance();

    // verifica se o tipo é outcome (despesa) e se é maior que o total (saldo)
    // se for ele não permite a operação e retorna um erro;
    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balance');
    }

    // acessando o metodo create
    // e passando o valores como parâmetro
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
