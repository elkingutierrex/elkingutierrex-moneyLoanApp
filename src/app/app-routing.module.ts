import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanApplyComponent } from './componets/credits/loan-apply/loan-apply.component';
import { CreditsComponent } from './componets/credits/credits.component';
import { LoanListComponent } from './componets/credits/loan-list/loan-list.component';


const routes: Routes = [
  {path: 'home', component: CreditsComponent,
    // children:
    // [ 
    //   {path: 'resumen-usuarios', component: LoanListComponent},
      
    // ]  
  },
  // {path: 'resumen-Usuarios', component: LoanListComponent},
  {path: '**', redirectTo: 'home'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
