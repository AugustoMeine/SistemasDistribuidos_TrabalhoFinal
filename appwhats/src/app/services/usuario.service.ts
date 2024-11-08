import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario.model';
import { API_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  ip: string;

  constructor(private http: HttpClient){
    this.ip = API_CONFIG.ip;
  }

  public consultarUsuarios():Observable<any>{
    return this.http.get(this.ip + ":2485/Usuario/");
  }

  public consultarUsuario(idUsuario: number):Observable<any>{
    return this.http.get(this.ip + ":2485/Usuario/"+ idUsuario);
  }

  public validarLogin(login: string, senha: string):Observable<any>{
    return this.http.get(this.ip + ":2485/Usuario/Login/"+login+"/"+senha);
  }

  public salvarUsuario(usuario: Usuario):Observable<any>{
    return this.http.post(this.ip + ":2485/Usuario/", usuario);
  }

  public atualizarUsuario(usuario: Usuario):Observable<any>{
    return this.http.put(this.ip + ":2485/Usuario/", usuario);
  }

  public deletarUsuario(idUsuario: number):Observable<any>{
    return this.http.get(this.ip + ":2485/Usuario/Excluir/"+idUsuario);
  }
}