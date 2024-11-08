package com.apm.AppWhats.services;

import java.util.Base64;
import java.util.List;
import java.util.logging.Logger;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

import com.apm.AppWhats.models.Mensagem;
import com.apm.AppWhats.repositories.MensagemRepository;
import com.apm.AppWhats.repositories.UsuarioRepository;

@Service
public class MensagemService {

    Logger logger = Logger.getLogger(MensagemService.class.getName());
    private final MensagemRepository mensagemRepository;
    private final UsuarioRepository usuarioRepository;

    private static final String ALGORITHM = "AES";
    private static final String SECRET_KEY_STRING = "Q2hhdmVBdWd1c3RvQ2hhdmVBdWd1c3Rv";
    private static final SecretKey SECRET_KEY = decodeKey(SECRET_KEY_STRING);

    private static SecretKey decodeKey(String key) {
        byte[] decodedKey = Base64.getDecoder().decode(key);
        return new SecretKeySpec(decodedKey, 0, decodedKey.length, ALGORITHM);
    }

    private static String encrypt(String data) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, SECRET_KEY);
            byte[] encryptedBytes = cipher.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Erro:" + e.getMessage());
        }
    }

    private static String decrypt(String encryptedData) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, SECRET_KEY);
            byte[] decodedBytes = Base64.getDecoder().decode(encryptedData);
            byte[] decryptedBytes = cipher.doFinal(decodedBytes);
            return new String(decryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Erro:" + e.getMessage());
        }
    }

    public MensagemService(MensagemRepository mensagemRepository, UsuarioRepository usuarioRepository){
        this.mensagemRepository = mensagemRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Mensagem> consultarMensagems() {
        List<Mensagem> mensagens = mensagemRepository.findAll();
        for (Mensagem mensagem : mensagens) {
            mensagem.setMensagem(decrypt(mensagem.getMensagem()));
        }
        return mensagens;
    }

    public Mensagem consultarMensagem(long idMensagem){
        return(mensagemRepository.findById(idMensagem));
    }

    public Mensagem salvarMensagem(Mensagem mensagem) {
        // Valida se ja existe alguem com o id mensagem notificado
        if (mensagemRepository.existsById(mensagem.getIdMensagem())) {
            logger.warning("Mensagem ja cadastrada");
            return null;
        }

        if (!usuarioRepository.existsById(mensagem.getIdUsuarioRemetente())) {
            logger.warning("Usuario Remetente nao encontrado");
            return null;
        }

        if (!usuarioRepository.existsById(mensagem.getIdUsuarioDestinatario())) {
            logger.warning("Usuario Destinatario nao encontrado");
            return null;
        }

        if (mensagem.getIdUsuarioRemetente() == mensagem.getIdUsuarioDestinatario()) {
            logger.warning("Usuario Remetente e Destinatario nao podem ser iguais");
            return null;
        }

        mensagem.setMensagem(encrypt(mensagem.getMensagem()));
        mensagem.setIdMensagem(-1L);
        return mensagemRepository.save(mensagem);
    }    

    public boolean deletarMensagem(long idMensagem){
        //valida se o mensagem existe
        if(mensagemRepository.existsById(idMensagem)){
            mensagemRepository.deleteById(idMensagem);
            return(!mensagemRepository.existsById(idMensagem));
        }
        logger.warning("Mensagem nao encontrada");
        return(false);
    }
}
