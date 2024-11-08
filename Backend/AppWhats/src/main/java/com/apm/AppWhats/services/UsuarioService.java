package com.apm.AppWhats.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import com.apm.AppWhats.models.Usuario;
import com.apm.AppWhats.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    Logger logger = Logger.getLogger(UsuarioService.class.getName());
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> consultarUsuarios(){
        return(usuarioRepository.findAll());
    }

    public Usuario consultarUsuario(long idUsuario){
        return(usuarioRepository.findById(idUsuario));
    }

    public Usuario validarLogin(String login, String senha){
        if(usuarioRepository.existsByLoginAndSenha(login, senha)){
            //Validar se o login ou a senha tem maiusculas ou minusculas
            Usuario UsuarioAux = usuarioRepository.findByLoginAndSenha(login, senha);

            if(!UsuarioAux.getLogin().equals(login) || !UsuarioAux.getSenha().equals(senha)){
                logger.warning("Usuário não encontrado");
                return(null);
            }

            return(UsuarioAux);
        }
        return(null);
    };

    public Usuario salvarUsuario(Usuario usuario){
        //Valida se já existe alguem com o usuário notificado
        if(usuarioRepository.existsByLogin(usuario.getLogin())){
            logger.warning("Usuário já cadastrado");
            return(null);
        }

        usuario.setIdUsuario(-1L);

        return(usuarioRepository.save(usuario));
    }

    public Usuario alterarUsuario(Usuario usuario){
        if(!usuarioRepository.existsById(usuario.getIdUsuario())){
            logger.warning("Usuário não encontrado");
            return(null);
        }

        Usuario usuarioFinal = usuarioRepository.findById(usuario.getIdUsuario());

        //Separa apenas os campos que podem ser alterados        
        usuarioFinal.setSenha(usuario.getSenha());
        usuarioFinal.setApelido(usuario.getApelido());

        return(usuarioRepository.save(usuarioFinal));
    }

    public boolean deletarUsuario(long idUsuario){
        //valida se o usuário existe
        if(usuarioRepository.existsById(idUsuario)){
            usuarioRepository.deleteById(idUsuario);
            return(!usuarioRepository.existsById(idUsuario));
        }
        logger.warning("Usuário não encontrado");
        return(false);
    }

}
