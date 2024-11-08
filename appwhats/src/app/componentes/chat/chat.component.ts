import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MensagemService } from '../../services/mensagem.service';
import { Mensagem } from '../../models/Mensagem.model';
import { UsuarioService } from '../../services/usuario.service'; // Supondo que você tenha um serviço de usuário
import { Usuario } from '../../models/Usuario.model'; // Supondo que você tenha um modelo de usuário

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Output() trocarComponenteFilho = new EventEmitter<string>();  

  listaMensagem: Mensagem[] = [];
  mensagemTexto: string = "";
  mensagemEnviada: Mensagem;
  updateInterval: any;
  usuario: any;
  listaUsuarios: Usuario[] = []; // Lista de usuários
  usuarioChat: Usuario;

  constructor(private mensagemService: MensagemService, private usuarioService: UsuarioService) {
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.usuarioChat = JSON.parse(localStorage.getItem('usuarioChat') || '{}');    

    if (this.usuario.id || this.usuarioChat.idUsuario) {
      localStorage.removeItem('usuarioChat');
    }    

    this.mensagemEnviada = new Mensagem(0, Number(this.usuario.id), Number(this.usuarioChat.idUsuario), '');
    this.atualizarMensagens();
    this.carregarUsuarios(); // Carregar a lista de usuários
  }

  ngAfterViewInit() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    this.updateInterval = setInterval(() => {
      this.atualizarMensagens();
    }, 2000);
  }

  ngOnDestroy() {
    this.delisgarAtualizacaoMensagens();
  }

  enviarMensagem() {
    this.mensagemEnviada.mensagem = this.mensagemTexto;
    if (this.mensagemTexto.trim()) {
      this.mensagemService.salvarMensagem(this.mensagemEnviada).subscribe({
        next: (mensagem: Mensagem) => {          
          this.mensagemTexto = '';
        },
        error: (error: any) => {
          console.error('Erro ao enviar mensagem:', error);
        },
        complete: () => {
          this.atualizarMensagens();
        }
      });
    }
  }

  atualizarMensagens() {  
    this.mensagemService.consultarMensagens().subscribe({
      next: (mensagens: Mensagem[]) => {
        this.listaMensagem = mensagens;
        this.listaMensagem = mensagens.filter(mensagem => 
          (mensagem.idUsuarioDestinatario === this.usuario.id && mensagem.idUsuarioRemetente === this.usuarioChat.idUsuario) ||
          (mensagem.idUsuarioRemetente === this.usuario.id && mensagem.idUsuarioDestinatario === this.usuarioChat.idUsuario)
        ).sort((a, b) => a.idMensagem - b.idMensagem);
      },
      error: (error: any) => {
        console.error('Erro ao atualizar mensagens:', error);
      }
    });
  }

  delisgarAtualizacaoMensagens() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  carregarUsuarios() {
    this.usuarioService.consultarUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.listaUsuarios = usuarios;
      },
      error: (error: any) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  consultarNome(idUsuario: number): string {
    let usuario = this.listaUsuarios.find(u => u.idUsuario === idUsuario);
    return usuario ? usuario.apelido : '-';
  }
}