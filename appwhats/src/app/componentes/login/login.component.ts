import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: string;
  senha: string;

  constructor(private router: Router, private usuarioService: UsuarioService){
    this.login = "";
    this.senha = "";
  }

  ngOnInit():void {   
    if(localStorage.getItem('user') != null){
      this.router.navigate(['/Menu']);
    } 
  }

  logar(){
    if(this.login === "" || this.senha === ""){
      console.log("Campo(s) não preenchido(s)");
      return;
    }
    
    this.usuarioService.validarLogin(this.login,this.senha).subscribe(
      {
        next:(data: Usuario)=>{
          if(data){
            let user = {
              nome: data.apelido,
              id: data.idUsuario
            };
            localStorage.setItem('user',JSON.stringify(user));            
          }else{
            console.log("Login e/ou senha invalido(s)");
          }                  
        },
        error:(erro: any)=>{
          console.log("Falha ao realizar o login: ");
          console.log(erro);
        },
        complete:()=>{
          this.router.navigate(['/Menu']);
        }
      }
    );
  }


  cadastrar() {
    this.router.navigate(['/Cadastro']);
  }

}