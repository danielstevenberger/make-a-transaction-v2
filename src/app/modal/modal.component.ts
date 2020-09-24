import { AccountService } from "./../services/account.service";
import { TransactionsService } from "src/app/services/transactions.service";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { TransferService } from "../services/transfer.service";
import { Transfer } from "../models/transfer.model";
@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  constructor(
    private transferService: TransferService,
    private transactionService: TransactionsService,
    private accountService: AccountService
  ) {}

  transfer$: Observable<Transfer>;

  //Gets an observable containing transfer information
  ngOnInit(): void {
    this.transfer$ = this.transferService.getTransfer();
  }

  // If the user clicks the cancel button
  onCancel() {
    this.transferService.closeConfirm();
  }

  //If the user clicks the transfer button
  onTransfer(transfer: Transfer) {
    this.transactionService.addTransaction(transfer);
    this.accountService.subtractBalance(transfer.amount);
    this.transferService.resetForm();
    this.transferService.closeConfirm();
  }
}
