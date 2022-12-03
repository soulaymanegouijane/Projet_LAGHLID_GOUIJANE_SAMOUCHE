package com.projet.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {

    private String token;

    private String type = "Bearer";

    private Long id;

    private String username;

    private String email;

    private Set<String> role;


    public JwtResponse(String jwt, Long id, String username, String email, Set<String> roles) {
        this.token = jwt;
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = roles;
    }
}

