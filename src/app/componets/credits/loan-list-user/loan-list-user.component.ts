import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-list-user',
  templateUrl: './loan-list-user.component.html',
  styleUrls: []
})
export class LoanListUserComponent implements OnInit {

  constructor() { }

  @Input() objCredit;
  

  ngOnInit(): void {
  }



}
