import Transaction from '../models/Transaction';

interface CreateTransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.map(transaction => {
      if (transaction.type === 'income')
        income += transaction.value;
      else
        outcome += transaction.value;
    })
    const total = income - outcome

    const balance = {
      income,
      outcome,
      total
    }

    return balance
  }

  public create({ title, value, type }: CreateTransactionsDTO): Transaction {
     const transaction = new Transaction({ title, value, type })

     this.transactions.push(transaction)

     return transaction
  }
}

export default TransactionsRepository;
