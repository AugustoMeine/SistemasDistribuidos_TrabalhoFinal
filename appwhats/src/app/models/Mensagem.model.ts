export class Mensagem {
    idMensagem: number;
    idUsuarioRemetente: number;
    idUsuarioDestinatario: number;
    mensagem: string;

    constructor(idMensagem: number, idUsuarioRemetente: number, idUsuarioDestinatario: number, mensagem: string) {
        this.idMensagem = idMensagem;
        this.idUsuarioRemetente = idUsuarioRemetente;
        this.idUsuarioDestinatario = idUsuarioDestinatario;
        this.mensagem = mensagem;
    }
}