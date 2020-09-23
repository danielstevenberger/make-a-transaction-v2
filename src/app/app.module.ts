import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CardContainerComponent } from "./card-container/card-container.component";
import { CardComponent } from "./card-container/card/card.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionComponent } from "./transactions/transaction/transaction.component";
import { SearchComponent } from "./transactions/search/search.component";

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
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
