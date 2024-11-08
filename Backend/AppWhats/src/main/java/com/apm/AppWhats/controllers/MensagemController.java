package com.apm.AppWhats.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apm.AppWhats.models.Mensagem;
import com.apm.AppWhats.services.MensagemService;


@RestController
@RequestMapping("/Mensagem")
@CrossOrigin("*")

public class MensagemController {
    
    private final MensagemService mensagemService;

    public MensagemController(MensagemService mensagemService){
        this.mensagemService = mensagemService;
    }

    @GetMapping({"/",""})
    public ResponseEntity<List<Mensagem>> lerMensagems(){
        return(ResponseEntity.status(HttpStatus.OK).body(mensagemService.consultarMensagems()));
    }

    @GetMapping("/{idMensagem}")
    public ResponseEntity<Mensagem> lerMensagem(@PathVariable long idMensagem){
        return(ResponseEntity.status(HttpStatus.OK).body(mensagemService.consultarMensagem(idMensagem)));
    }

    @PostMapping({"/",""})
    public ResponseEntity<Mensagem> salvarMensagem(@RequestBody Mensagem mensagem){
        return(ResponseEntity.status(HttpStatus.OK).body(mensagemService.salvarMensagem(mensagem)));
    }
    
    @GetMapping("/Excluir/{idMensagem}")
    public ResponseEntity<Boolean> deletarMensagem(@PathVariable long idMensagem){
        return(ResponseEntity.status(HttpStatus.OK).body(this.mensagemService.deletarMensagem(idMensagem)));
    }
}
