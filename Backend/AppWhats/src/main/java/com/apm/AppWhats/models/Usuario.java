package com.apm.AppWhats.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "USUARIO")
public class Usuario {
    @Id
    @Column(name = "ID_USUARIO", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idUsuario;

    @Column(name="LOGIN", nullable=false)
    private String login;

    @Column(name="SENHA", nullable=false)
    private String senha;

    @Column(name="APELIDO", nullable=false)
    private String apelido;

    public Usuario() {
    }

    public Usuario(String apelido, long idUsuario, String login, String senha) {
        this.apelido = apelido;
        this.idUsuario = idUsuario;
        this.login = login;
        this.senha = senha;
    }

    public long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getApelido() {
        return apelido;
    }

    public void setApelido(String apelido) {
        this.apelido = apelido;
    }


}
