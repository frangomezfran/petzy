package com.petzy.security;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Servicio encargado de la generación de tokens JWT.
 */
@ApplicationScoped
public class TokenService {

    /**
     * Genera un token JWT para un usuario con un rol específico.
     * @param username El nombre de usuario.
     * @param role El rol del usuario (USER, ADMIN).
     * @return String con el token JWT generado.
     */
    public String generateToken(String username, String role) {
        Set<String> roles = new HashSet<>(Arrays.asList(role));
        return Jwt.issuer("https://petzy.com/issuer")
                .upn(username)
                .groups(roles)
                .expiresIn(3600) // 1 hora de validez
                .sign();
    }
}
