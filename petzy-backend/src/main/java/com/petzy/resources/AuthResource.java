package com.petzy.resources;

import com.petzy.entities.User;
import com.petzy.security.TokenService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import at.favre.lib.crypto.bcrypt.BCrypt;

/**
 * Recurso REST para la autenticación de usuarios.
 */
@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    TokenService tokenService;

    public static class LoginRequest {
        public String username;
        public String password;
    }

    public static class LoginResponse {
        public String token;
        public String username;
        public String role;

        public LoginResponse(String token, String username, String role) {
            this.token = token;
            this.username = username;
            this.role = role;
        }
    }

    /**
     * Endpoint para el inicio de sesión.
     * @param request Datos de acceso (usuario y contraseña).
     * @return Respuesta con el token JWT si los datos son correctos.
     */
    @POST
    @Path("/login")
    public Response login(LoginRequest request) {
        User user = User.find("username", request.username).firstResult();

        if (user != null && BCrypt.verifyer().verify(request.password.toCharArray(), user.password).verified) {
            String token = tokenService.generateToken(user.username, user.role);
            return Response.ok(new LoginResponse(token, user.username, user.role)).build();
        }

        return Response.status(Response.Status.UNAUTHORIZED).entity("Credenciales inválidas").build();
    }
}
