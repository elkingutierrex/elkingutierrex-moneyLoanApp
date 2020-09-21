import { Component, OnInit } from '@angular/core';
import { CreditService } from '../../services/credit.service';


@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styles: [
  ]
})
export class CreditsComponent implements OnInit {

  CAPITAL ={
    total: 1000000
    ,loans:0
    ,payments:0
  } 

  objConsult:any = {
    documentId : null,
    valueLastLoanRequested : null
  }

  objControl={
    type:'history'
    ,view:false 
  /* 
  loan
  payment
  userHistory
  history
  */
  }

 

  loanList: any = [];

  objCredit: any = {};

  etiqueta={
    name: 'solicitar'
    ,text: null
  }

  constructor( public _credit : CreditService ) { }

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
        this.totalLoansUser()
      });
  }

  resetObjet( id ){
    this.objCredit = {
      documentId                : id
      ,name                     : null
      ,swApproved               : false
      ,valueLastLoanRequested   : null
      ,valueLastPaymentMade     : null
      ,loans                    : []
      ,payments                 : []
    };
  }


  filterUser( id ){

    this.resetObjet(id);
    this.objControl.view = true;
  

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

      this.objCredit.valueLastLoanRequested = 0;
      this.objCredit.valueLastPaymentMade = 0;

      this.getDetailMvByUser(this.objCredit)
      console.log(this.objCredit)
   
    });
  }

  validateView(){
    this.objControl.view = !this.objControl.view;

    if(this.objControl.view){
      this.filterUser(this.objConsult.documentId)
    }else{
      this.objConsult.documentId = null;
      this.resetObjet(null);
    }
  }

  totalLoansUser(){
    this.loanList.forEach( item => {
      let arrayLoans = this._credit.convertObjetInArray(item.loans);
      let arrayPayments =  this._credit.convertObjetInArray(item.payments);

      if( arrayLoans != undefined  && arrayLoans.length ){
        item.loansTotal = arrayLoans.reduce((acum, result) => {return (acum + result.value) },0);
      }else{
        item.loansTotal = 0
      }

      if( arrayPayments != undefined  && arrayPayments.length ){
        item.paymentTotal = arrayPayments.reduce((acum, result) => { return (acum + result.value)},0 );
      }else{
        item.paymentTotal = 0
      }
    })
      this.totalLoans();
  }

  totalLoans(){
    this.CAPITAL.loans    = this.loanList.reduce((acum, result) => {return (acum + result.loansTotal ) },0);
    this.CAPITAL.payments = this.loanList.reduce((acum, result) => {return (acum + result.paymentTotal ) },0);
    this.CAPITAL.total    = this.CAPITAL.total  - ( this.CAPITAL.loans - this.CAPITAL.payments)
  }

  getDetailMvByUser( item ){
    let arrayLoans = this._credit.convertObjetInArray(item.loans);
    let arrayPayments =  this._credit.convertObjetInArray(item.payments);
    item.arrayLoans = arrayLoans;
    item.arrayPayments= arrayPayments;
    if( arrayLoans != undefined  && arrayLoans.length ){
      item.loansTotal = arrayLoans.reduce((acum, result) => {return (acum + result.value) },0);
    }else{
      item.loansTotal = 0
    }
    
    if( arrayPayments != undefined  && arrayPayments.length ){
      item.paymentTotal = arrayPayments.reduce((acum, result) => { return (acum + result.value)},0 );
    }else{
      item.paymentTotal = 0
    }
    
    item.debtTotal = (item.loansTotal - item.paymentTotal)

  }


  

  changeType( type:string ){
    this.objControl.type = type;
  }
}
