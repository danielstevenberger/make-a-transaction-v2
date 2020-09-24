import { TransferService } from "./../services/transfer.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Account } from "../models/account.model";
import { AccountService } from "../services/account.service";

@Component({
  selector: "app-transfer",
  templateUrl: "./transfer.component.html",
  styleUrls: ["./transfer.component.scss"],
})
export class TransferComponent implements OnInit {
  //used so the transfer can be pushed to the transaction list
  //boolean to notify a warning message
  errorMessage = false;
  //The account. Object contains an account name and balance.
  account$: Observable<Account>;
  //boolean to notify and overdraw over $500
  overdrawn = false;

  constructor(
    private accountService: AccountService,
    private transferService: TransferService
  ) {}

  //Creates the reactive form with validators.
  transferForm = new FormGroup({
    toAccount: new FormControl("", Validators.required),
    amount: new FormControl("", [Validators.required, Validators.min(0)]),
  });

  //When the user submits the form
  onSubmit(balance: number, fromAccount: string) {
    // If the form is not valid and not overdrawn
    if (
      !this.transferForm.valid &&
      this.accountService.checkBalance(
        balance,
        this.transferForm.get("amount").value
      )
    ) {
      this.errorMessage = true;
      this.overdrawn = false;
    }
    //If the form is valid and the account is overdrawn
    if (
      this.transferForm.valid &&
      !this.accountService.checkBalance(
        balance,
        this.transferForm.get("amount").value
      )
    ) {
      this.overdrawn = true;
      this.errorMessage = false;
    }
    //If the form is valid and not overdrawn
    if (
      this.transferForm.valid &&
      this.accountService.checkBalance(
        balance,
        this.transferForm.get("amount").value
      )
    ) {
      // Notifies the modal to open and sends the form data to it.
      this.transferService.openConfirm(
        fromAccount,
        this.transferForm.get("toAccount").value,
        this.transferForm.get("amount").value,
        this.transferForm
      );
      // resets the overdraw warning
      this.overdrawn = false;
      //resets the error message
      this.errorMessage = false;
    }
  }

  ngOnInit(): void {
    // recieves the data about the account
    this.account$ = this.accountService.getAccount();
  }
}
