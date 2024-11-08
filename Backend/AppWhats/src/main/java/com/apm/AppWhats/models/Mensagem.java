package com.apm.AppWhats.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "MENSAGEM")
public class Mensagem {

    @Id
    @Column(name = "ID_MENSAGEM", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMensagem;
    
    @Column(name="ID_USUARIO_REMETENTE", nullable=false)
    private long idUsuarioRemetente;
    
    @Column(name="ID_USUARIO_DESTINATARIO", nullable=false)
    private long idUsuarioDestinatario;
    
    @Column(name="MENSAGEM", nullable=false)
    private String mensagem;

    public Mensagem() {
    }

    public Mensagem(long idMensagem, long idUsuarioDestinatario, long idUsuarioRemetente, String mensagem) {
        this.idMensagem = idMensagem;
        this.idUsuarioDestinatario = idUsuarioDestinatario;
        this.idUsuarioRemetente = idUsuarioRemetente;
        this.mensagem = mensagem;
    }

    public long getIdMensagem() {
        return idMensagem;
    }

    public void setIdMensagem(long idMensagem) {
        this.idMensagem = idMensagem;
    }

    public long getIdUsuarioRemetente() {
        return idUsuarioRemetente;
    }

    public void setIdUsuarioRemetente(long idUsuarioRemetente) {
        this.idUsuarioRemetente = idUsuarioRemetente;
    }

    public long getIdUsuarioDestinatario() {
        return idUsuarioDestinatario;
    }

    public void setIdUsuarioDestinatario(long idUsuarioDestinatario) {
        this.idUsuarioDestinatario = idUsuarioDestinatario;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
    
}
