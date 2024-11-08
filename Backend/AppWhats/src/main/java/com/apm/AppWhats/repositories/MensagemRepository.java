package com.apm.AppWhats.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apm.AppWhats.models.Mensagem;

@Repository
public interface MensagemRepository extends JpaRepository<Mensagem, Long> {

    Mensagem findById(long idMensagem);
    List<Mensagem> findAll();

}
