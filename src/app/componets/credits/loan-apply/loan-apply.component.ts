import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
  @Input() type: string;
  

  objControl = {
    minValue : 10000,
    maxValue : 100000
  }


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

  validateForm( obj, type ){

    let msgError = ''

    if( !obj.swApproved){
      msgError =  `Tus creditos han sido <b>rechazados</b>, contacta el administrador`
    } // caso especial para los pagos
    else if ( type == 'payment' ){
      if(!obj.valueLastPaymentMade ){
        msgError = `Debe ingeresar un valor valido para el abono o pago`
      }else if( obj.valueLastPaymentMade > obj.debtTotal){
        msgError = `<b>Tu deuda total es de  ${ obj.debtTotal},</b> y quieres pagar  ${ obj.valueLastPaymentMade}`
      }
    } else if( !obj.documentId){
      msgError = `Debe digitar el número de cédula`
    }
    else if( !obj.name){
      msgError =  `Debe digitar el nombre`
    }else if( !obj.email){
      msgError =  `Debe digitar el email`
    } 
    
    if(!msgError){
      // Validar maximos y minimos
      if ( type == 'loan' ){
        if(obj.valueLastLoanRequested > this.objControl.maxValue || obj.valueLastLoanRequested < this.objControl.minValue ){
          msgError = `El valor del prestamo debe ser de mínimo ${ this.objControl.minValue },máximo ${ this.objControl.maxValue } `
        }else if( obj.debtTotal > 0 ){
          msgError = `Debes ponerte al dia con tus créditos tu deuda suma; $ ${ obj.debtTotal }. `
        }
      } 
    }


    if(msgError){
      Swal.fire(
        'Opps...',
        `Con calma, ${msgError}` ,
        'warning'
      )
    }

    return msgError;
  }

  insertLoan( ){
    let error = this.validateForm( this.objCredit, 'loan' )
    if(error) return

    if( !this.objCredit.$key  ){
      this._credit.insertCredit( this.objCredit ) 
    } else{
      this._credit.updateCreditLoan( this.objCredit )
    }
  }

  insertPayment(){
    let error = this.validateForm( this.objCredit, 'payment' )
    if(error) return

    this._credit.updateCreditPayment( this.objCredit )
  }




}
