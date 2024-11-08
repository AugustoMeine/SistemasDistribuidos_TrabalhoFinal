import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Usuario } from '../../models/Usuario.model';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-lista-amigos',
  standalone: true,
  imports: [NgFor, NgIf,NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './lista-amigos.component.html',
  styleUrl: './lista-amigos.component.css'
})
export class ListaAmigosComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();

  listaUsuarios: Usuario[] = [];
  updateInterval: any;
  constructor(private usuarioService: UsuarioService) {
    this.atualizarListaAmigos();    
  }

  ngAfterViewInit() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    this.updateInterval = setInterval(() => {
      this.atualizarListaAmigos();
    }, 2000);
  }

  ngOnDestroy() {
    this.delisgarAtualizacaoUsuarios();
  }

  // Função para obter as chaves do model para popular o cabeçalho da tabela
  getKeys(obj: any): string[] {    
    return(["Apelido"]);
  }

  atualizarListaAmigos(){
    this.usuarioService.consultarUsuarios().subscribe(
      {
        next: (usuarios: Usuario[]) => {
          this.listaUsuarios = usuarios;
          this.listaUsuarios = this.listaUsuarios.filter(usuario => usuario.idUsuario !== JSON.parse(localStorage.getItem('user') || '{}').id);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete:()=>{
          console.log("Usuarios atualizados");          
        }
      }
    );
  }

  abrirChat(usuario: Usuario){
    console.log("Abrindo chat com: " + usuario.apelido);
    localStorage.setItem('usuarioChat',JSON.stringify(usuario));
    this.delisgarAtualizacaoUsuarios();
    this.trocarComponenteFilho.emit("Chat");
  }

  delisgarAtualizacaoUsuarios(){
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

}
