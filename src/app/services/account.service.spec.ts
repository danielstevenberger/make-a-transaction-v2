import { fakeAsync, flush, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Account } from "../models/account.model";

import { AccountService } from "./account.service";

describe("AccountService", () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AccountService] });
    service = TestBed.inject(AccountService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should init an account", () => {
    let account: Account;
    service.account$.subscribe((res) => (account = res));
    expect(account).toBeTruthy();
    expect(account).toEqual({
      accountName: "Free Checking(4692)",
      balance: 5824.76,
    });
  });
  it("should return an account", () => {
    let account$ = service.getAccount();
    expect(account$).toEqual(service.account$);
  });
  it("should check to see if the balance will be overdrawn", () => {
    let test = service.checkBalance(0, 500);
    let test2 = service.checkBalance(0, 500.01);
    expect(test).toBeTruthy();
    expect(test2).toBeFalse();
  });
  it("should subtract a balance from an account", () => {
    service.subtractBalance(5824.76);
    let account: Account;
    service.account$.subscribe((res) => (account = res));
    console.log(account);
    expect(account).toEqual({
      accountName: "Free Checking(4692)",
      balance: 0,
    });
  });
});
