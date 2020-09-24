import { FormGroup } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
// import { Transfer } from "./../interfaces/transfer.interface";
import { Injectable } from "@angular/core";
import { Transfer } from "../models/transfer.model";

@Injectable({
  providedIn: "root",
})
export class TransferService {
  private transferSubject = new BehaviorSubject<Transfer>(null);
  transfer$: Observable<Transfer> = this.transferSubject.asObservable();

  private transferForm: FormGroup;

  //Opens the modal
  openConfirm(
    fromAccount: string,
    toAccount: string,
    amount: number,
    transferForm: FormGroup
  ) {
    this.transferSubject.next({ fromAccount, toAccount, amount });
    this.transferForm = transferForm;
  }

  //Gets the observable containing transfer information
  getTransfer() {
    return this.transfer$;
  }

  // //used to cancel the transfer and close the modal
  closeConfirm() {
    this.transferSubject.next(null);
  }

  //resets the transfor from
  resetForm() {
    this.transferForm.reset();
  }

  constructor() {}
}
