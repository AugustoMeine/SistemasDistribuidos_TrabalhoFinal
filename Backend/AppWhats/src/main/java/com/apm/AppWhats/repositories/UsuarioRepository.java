package com.apm.AppWhats.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.apm.AppWhats.models.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Usuario findById(long idUsuario);
    Usuario findByLoginAndSenha(String idLogin, String idSenha);
    List<Usuario> findAll();

    @Query("SELECT u FROM Usuario u WHERE u.login = :vLogin AND u.senha = :vSenha")
    Usuario validarAcessoUsuario(@Param("vLogin") String vLogin,@Param("vSenha") String vSenha);

    boolean existsByLoginAndSenha(String idLogin, String idSenha);
    boolean existsByLogin(String idLogin);
}