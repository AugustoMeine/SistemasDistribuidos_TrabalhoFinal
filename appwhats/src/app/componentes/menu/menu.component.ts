import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { Funcionalidade } from '../../models/Funcionalidade.model';
import { ListaAmigosComponent } from '../lista-amigos/lista-amigos.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @ViewChild('conteudo', { read: ViewContainerRef }) conteudo!: ViewContainerRef;

  listaFuncionalidades: Funcionalidade[];  
  letrasNome: string = "-";
  menuUsuarioAberto: boolean = false;
  hover: boolean = false;

  constructor(private router: Router) {
    this.listaFuncionalidades = [];
    
    this.carregarFuncionalidades();    

    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.nome) {
      let nomeLocalizado = user.nome.split(' ');
      if (nomeLocalizado.length > 1) {
        this.letrasNome = nomeLocalizado[0][0] + nomeLocalizado[nomeLocalizado.length - 1][0];
      } else {
        this.letrasNome = nomeLocalizado[0][0];
      }
    }
  }

  ngAfterViewInit() {
    this.direcionarParaOMenu();
    localStorage.removeItem('usuarioChat');
  }
  

  deslogar(){
    localStorage.removeItem('user');
    localStorage.removeItem('usuarioChat');
    this.router.navigate(['/']);
  }

  carregarFuncionalidades(){
    this.listaFuncionalidades.push({"nome":"Contatos","logo":"svg/grupo.svg"});    
  }

  trocarComponente(textoEntrada:string){   

    if(textoEntrada === "Contatos"){
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(ListaAmigosComponent); 
      //Conexao do componente filho com o pai
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }   
    
    if(textoEntrada === "Chat"){
      this.conteudo.clear();
      const componenteDinamico = this.conteudo.createComponent(ChatComponent); 
      //Conexao do componente filho com o pai
      componenteDinamico.instance.trocarComponenteFilho.subscribe(
        (textoEntrada:string) => this.trocarComponente(textoEntrada)
      );    
    }  
  }

  direcionarParaOMenu(){    
    this.trocarComponente("Contatos");
  }

}