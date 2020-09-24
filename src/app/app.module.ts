import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderModule } from "ngx-order-pipe";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CardContainerComponent } from "./card-container/card-container.component";
import { CardComponent } from "./card-container/card/card.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionComponent } from "./transactions/transaction/transaction.component";
import { TransferComponent } from "./transfer/transfer.component";
import { SearchComponent } from "./transactions/search/search.component";
import { ModalComponent } from "./modal/modal.component";

import { FilterPipe } from "./pipes/filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CardContainerComponent,
    CardComponent,
    TransactionsComponent,
    TransactionComponent,
    SearchComponent,
    FilterPipe,
    TransferComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
