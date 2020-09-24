import { FormControl } from "@angular/forms";
import { TransactionsService } from "src/app/services/transactions.service";
import { Transaction } from "./../models/transaction.model";
import { Observable } from "rxjs";
import { Input } from "@angular/core";
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
    private transactionService: TransactionsService
  ) {}

  transfer$: Observable<Transfer>;

  ngOnInit(): void {
    this.transfer$ = this.transferService.getTransfer();
  }

  // If the user clicks the cancel button. A function from the transfer service is called to cancel the transfer..
  onCancel() {
    this.transferService.closeConfirm();
  }

  //If the user clicks the transfer button. A function from from the transfer service is called make the transfer happen. After the modal is closed/
  onTransfer(transfer: Transfer) {
    this.transactionService.addTransaction(transfer);
    this.transferService.resetForm();
    this.transferService.closeConfirm();
  }
}
