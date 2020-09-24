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

  //Used to notify that the modal shoul open and sends the data to the modal through the homecomponent..
  openConfirm(
    fromAccount: string,
    toAccount: string,
    amount: number,
    transferForm: FormGroup
  ) {
    this.transferSubject.next({ fromAccount, toAccount, amount });
    this.transferForm = transferForm;
  }

  getTransfer() {
    return this.transfer$;
  }

  // //used to cancel the transfer and close the modal
  closeConfirm() {
    this.transferSubject.next(null);
  }

  resetForm() {
    this.transferForm.reset();
  }

  constructor() {}
}
