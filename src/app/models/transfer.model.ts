//Model for a transfer
export class Transfer {
  public fromAccount: string;
  public toAccount: string;
  public amount: number;
  constructor(fromAccount: string, toAccount: string, amount: number) {
    this.fromAccount = fromAccount;
    this.toAccount = toAccount;
    this.amount = amount;
  }
}
