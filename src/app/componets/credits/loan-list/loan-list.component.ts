import { Component, OnInit } from '@angular/core';
import { CreditService } from '../../../services/credit.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styles: [
  ]
})
export class LoanListComponent implements OnInit {

  loanList :any = [];

  constructor( public _credit : CreditService) { }

  ngOnInit(): void {
    this._credit.getCredits()
      .snapshotChanges()
      .subscribe(item => {
        this.loanList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.loanList.push(x);
        });
      });
  }



}
