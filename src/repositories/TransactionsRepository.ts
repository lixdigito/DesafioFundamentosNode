import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreatTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.reduceValueByType('income');
    const outcome = this.reduceValueByType('outcome');
    const total = income - outcome;

    return {income, outcome, total};
  }

  private reduceValueByType(type: 'income' | 'outcome') : number {
    return this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === type) return accumulator += currentValue.value;
      return accumulator;
    }, 0);
  }

  public create({title, value, type} : CreatTransactionDto): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
    
  }
}

export default TransactionsRepository;
