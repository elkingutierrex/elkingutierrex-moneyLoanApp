import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componets/shared/navbar/navbar.component';

import { CreditsComponent } from './componets/credits/credits.component';
import { LoanListComponent } from './componets/credits/loan-list/loan-list.component';
import { LoanApplyComponent } from './componets/credits/loan-apply/loan-apply.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreditsComponent,
    LoanListComponent,
    LoanApplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
