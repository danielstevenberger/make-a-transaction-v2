import { DATA } from "./../../assets/transaction-data/transactionsTest";
import { fakeAsync, flush, TestBed, tick } from "@angular/core/testing";

import { TransactionsService } from "./transactions.service";

import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { Transfer } from "../models/transfer.model";

describe("TransactionsService", () => {
  let service: TransactionsService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TransactionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    const req = httpTestingController.expectOne(
      "../../assets/transaction-data/transactions.json"
    );

    req.flush({ data: Object.values(DATA)[0] });
  });

  it("should recieve data from the .json file", () => {
    service.getTransactions().subscribe((transactions) => {
      expect(transactions).toBeTruthy();
      expect(transactions.length).toBe(10);
    });
  });

  it("should return a transactions obsersvable", () => {
    let transactions$ = service.getTransactions();
    expect(transactions$).toBeTruthy();
    expect(transactions$).toEqual(service.transactions$);
  });

  it("should add a transaction to the transaction obersvable", () => {
    const transfer: Transfer = {
      toAccount: "toAccount",
      fromAccount: "fromAccount",
      amount: 100,
    };
    service.addTransaction(transfer);
    service.getTransactions().subscribe((transactions) => {
      expect(transactions).toBeTruthy();
      expect(transactions.length).toBe(11);
      expect(transactions[10].merchant).toEqual("toAccount");
      expect(transactions[10].amount).toBe(100);
    });
  });
});
