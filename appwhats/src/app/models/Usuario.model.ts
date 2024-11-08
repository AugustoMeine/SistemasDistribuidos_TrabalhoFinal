export class Usuario {
    idUsuario: number;
    login: string;
    senha: string;
    apelido: string;

    constructor(idUsuario: number, login: string, senha: string, apelido: string) {
        this.idUsuario = idUsuario;
        this.login = login;
        this.senha = senha;
        this.apelido = apelido;
    }
}