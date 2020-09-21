import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componets/shared/navbar/navbar.component';

import { CreditsComponent } from './componets/credits/credits.component';
import { LoanListComponent } from './componets/credits/loan-list/loan-list.component';
import { LoanApplyComponent } from './componets/credits/loan-apply/loan-apply.component';

import { environment } from '../environments/environment';

//firebase 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { CreditService } from './services/credit.service';
import { LoanListUserComponent } from './componets/credits/loan-list-user/loan-list-user.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreditsComponent,
    LoanListComponent,
    LoanApplyComponent,
    LoanListUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebaseConfig ),
    AngularFireDatabaseModule
  ],
  providers: [AngularFirestore, CreditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
