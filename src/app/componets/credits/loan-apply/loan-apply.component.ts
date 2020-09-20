import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { CreditService } from '../../../services/credit.service';

@Component({
  selector: 'app-loan-apply',
  templateUrl: './loan-apply.component.html',
  styles: [
  ]
})
export class LoanApplyComponent implements OnInit {

  @Input() objCredit;

  // objCredit: any = {
  //   documentId                : '425'
  //   ,name                     : 'asa'
  //   ,email                    : 'sas@gmail.com'
  //   ,swApproved               : false
  //   ,valueLastLoanRequested   : null
  //   ,valueLastPaymentMade     : null
  //   ,loans                    : []
  //   ,payments                 : []
  // };

  constructor( public _credit : CreditService) { }

  ngOnInit(): void {
    this._credit.getCredits();
    
  }

  insertUser(){
    this._credit.insertCredit( this.objCredit ) 
  }

  filterUser( id ){

    let loanList;
  
    this._credit.getCredits()
    .snapshotChanges()
    .subscribe(item => {
      loanList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        loanList.push(x);
      });

      if ( loanList.length > 0 ){
        let usuario = loanList.filter( item => item.documentId == id )[0];

        if( usuario ){
          this.objCredit = usuario;
        }
      }
   
    });

    

  
  }


}
