import { Component, Input, OnInit } from '@angular/core';
import { CreditService } from '../../../services/credit.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styles: [
  ]
})
export class LoanListComponent implements OnInit {


  @Input() loanList;

  constructor( public _credit : CreditService) { }

  ngOnInit(): void {
    
  }

}
