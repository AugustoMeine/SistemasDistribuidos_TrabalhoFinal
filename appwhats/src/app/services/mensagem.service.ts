import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config';
import { Mensagem } from '../models/Mensagem.model';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  ip: string;

  constructor(private http: HttpClient) {
    this.ip = API_CONFIG.ip;
  }

  public consultarMensagens(): Observable<any> {
    return this.http.get(this.ip + ":2485/Mensagem/");
  }

  public consultarMensagem(idMensagem: number): Observable<any> {
    return this.http.get(this.ip + ":2485/Mensagem/" + idMensagem);
  }

  public salvarMensagem(mensagem: Mensagem): Observable<any> {
    return this.http.post(this.ip + ":2485/Mensagem/", mensagem);
  }

  public deletarMensagem(idMensagem: number): Observable<any> {
    return this.http.get(this.ip + ":2485/Mensagem/Excluir/" + idMensagem);
  }
}
