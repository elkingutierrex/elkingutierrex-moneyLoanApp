import { Component, OnInit } from '@angular/core';
import { CreditService } from '../../services/credit.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styles: [
  ]
})
export class CreditsComponent implements OnInit {
  objConsult:any = {
    documentId : null,
    valueLastLoanRequested : null
  }

  objCredit

  constructor( public _credit : CreditService ) { }

  ngOnInit(): void {
    this._credit.getCredits();
  }


  filterUser( id ){

    this.objCredit = {}

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

      console.log(this.objCredit)
   
    });

    

  
  }
}
