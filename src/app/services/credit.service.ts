import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

//models
import { User } from '../models/user';
import { Loan } from '../models/loan';
import Swal from 'sweetalert2';
import { Payment } from '../models/payment';


@Injectable({
  providedIn: 'root'
})
export class CreditService {
  
  
  usertList: AngularFireList<any>;
  objCredit : User = new User();

  constructor( private firebase : AngularFireDatabase
                ,private db : AngularFirestore ) {

  }

  trueOrFalse( probTrue? : number ){
    if ( !probTrue ){
      probTrue = 0.5;
    }
    return Math.random() < probTrue;
  }

  newUser( user ){

    //Datos de usuario
    user.swApproved = this.trueOrFalse() // true or false aleatoriamente
    user.dateInsert = new Date().getTime() 

    let value = user.valueLastLoanRequested;

    let newUser: User  = {
      ...user
    };

    //Datos de prestamo
    let loans: Loan = {
      value: value,
      swApproved: newUser.swApproved,
      dateInsert: newUser.dateInsert,
    }
    
    newUser.loans=[];
    newUser.payments=[];
    newUser.loans.push(loans)

    return newUser;
  }


  getCredits(){
    return this.usertList = this.firebase.list('users')
  }

  insertCredit( user ){
    let credito =     this.newUser( user )
    this.usertList.push({... credito})

  }

  updateCreditLoan( credit: User){

    if( !credit.swApproved ){
      Swal.fire(
        'Credito Rechazado!',
        'Para que tus proximos creditos sean aprovados, contacta el administrador',
        'error'
      )
      return;
      
    }

    let value = credit['valueLastLoanRequested'];
    //Datos de prestamo
    let loan: Loan = {
      value: value,
      swApproved: credit.swApproved,
      dateInsert: new Date().getTime()
    }

    let newLoan = []
  


    // credit.loans.forEach( item => {
    //   console.log(item)
    // })
    // for (const i in credit.loans) {
    //   newLoan.push(credit.loans[i]);
    // }
    newLoan = this.convertObjetInArray(credit.loans);
    newLoan.push(loan)
    
    


    this.usertList.update( credit.$key, {
      documentId:credit.documentId,
      name: credit.name,
      email: credit.email,
      loans: newLoan
    })
  }

  updateCreditPayment( credit: User){
    let value = credit['valueLastPaymentMade'];
    //Datos de prestamo
    let payment: Payment = {
      value: value,
      dateInsert: new Date().getTime()
    }

    let newPayment = []  

    newPayment = this.convertObjetInArray(credit.payments);
    if(!newPayment) newPayment = [];
    newPayment.push(payment)

    this.usertList.update( credit.$key, {
      documentId:credit.documentId,
      name: credit.name,
      email: credit.email,
      payments: newPayment     
      
    })
  }  

  convertObjetInArray( obj  ){
    if( !obj) return;
    let array = []
    for (const i in obj) {
      array.push(obj[i]);
    }
    return array;
  }

  getUserByFilter( filter ){

    // return this.firebase.list('users'),{
    //   query: {
    //     orderByChild: 'documentId'
    //     ,equalTo: filter
    //   }
    // } 

  
  }

}
