import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(){

  }

  autenticar(): boolean {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    if(user == null){
      localStorage.clear();
      return (false);
    }

    return(true);    
  }

}