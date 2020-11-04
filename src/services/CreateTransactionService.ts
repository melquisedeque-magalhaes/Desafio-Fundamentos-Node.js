import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    const { total } = this.transactionsRepository.getBalance()

    if ( type !== 'income' && type !== 'outcome')
        throw Error("type invalid");

    if( type === 'outcome') {
      if(value > total)
      throw Error("value invalid, outcome not can smaller total");
    }

    const transaction = this.transactionsRepository.create({title, value, type})

    return transaction
  }
}

export default CreateTransactionService;
