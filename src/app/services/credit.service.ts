import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

//models
import { User } from '../models/user';
import { Loan } from '../models/loan';


@Injectable({
  providedIn: 'root'
})
export class CreditService {
  
  
  usertList: AngularFireList<any>;
  objCredit : User = new User();

  constructor( private firebase : AngularFireDatabase
                ,private db : AngularFirestore ) {

  }

  newUser( user ){

    //Datos de usuario
    user.swApproved = Math.random() < 0.5 // true or false aleatoriamente
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

    newUser.loans.push(loans)

    return newUser;
  }



  getCredits(){
    return this.usertList = this.firebase.list('users')
  }

 

  insertCredit( user ){
    let credito =     this.newUser( user )
    this.usertList.push({... credito
    })

  }

  updateCredit( credit: User){
    this.usertList.update( credit.$key, {
      documentId:credit.documentId,
      name: credit.name,
      email: credit.email,
      swApproved: credit.swApproved
    })
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
