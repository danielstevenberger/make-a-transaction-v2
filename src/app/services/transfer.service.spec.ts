import { Transfer } from "./../models/transfer.model";
import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup } from "@angular/forms";

import { TransferService } from "./transfer.service";

describe("TransferService", () => {
  let service: TransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should return a transfer observable", () => {
    const transfer$ = service.getTransfer();
    expect(transfer$).toBeTruthy();
    expect(transfer$).toEqual(service.transfer$);
  });

  it("should update transfer observable", () => {
    let transferForm = new FormGroup({
      toAccount: new FormControl("test"),
      amount: new FormControl(0),
    });
    service.openConfirm("fromAccount", "toAccount", 100, transferForm);
    let transfer: Transfer;
    service.transfer$.subscribe((res) => (transfer = res));
    expect(transfer).toBeTruthy();
    expect(transfer).toEqual({
      fromAccount: "fromAccount",
      toAccount: "toAccount",
      amount: 100,
    });
  });
  it("should empty the transfer observable", () => {
    service.closeConfirm();
    let transfer: Transfer;
    service.transfer$.subscribe((res) => (transfer = res));
    expect(transfer).toBeFalsy();
  });
});
