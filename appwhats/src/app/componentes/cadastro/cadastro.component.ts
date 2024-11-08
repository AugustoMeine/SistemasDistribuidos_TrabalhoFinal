import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  usuarioTela: Usuario;

  constructor(private router: Router, private usuarioService: UsuarioService){
    this.usuarioTela = new Usuario(0,"","","");
  }

  ngOnInit():void {   
    if(localStorage.getItem('user') != null){
      this.router.navigate(['/Menu']);
    } 
  }

  cadastrar(){
    if(this.usuarioTela.login === "" || this.usuarioTela.senha === "" || this.usuarioTela.apelido === ""){
      console.log("Campo(s) não preenchido(s)");
      return;
    }
    
    this.usuarioService.salvarUsuario(this.usuarioTela).subscribe(
      {
        next:(data: Usuario)=>{
          if(!data){
            console.log("Login e/ou senha invalido(s)");           
          }
        },
        error:(erro: any)=>{
          console.log("Falha ao realizar o login: ");
          console.log(erro);
        },
        complete:()=>{
          console.log("Usuario cadastrado com sucesso");
          this.router.navigate(['/']);
        }
      }
    );
  }

  retornarLogin() {
    this.router.navigate(['/']);
  }
}