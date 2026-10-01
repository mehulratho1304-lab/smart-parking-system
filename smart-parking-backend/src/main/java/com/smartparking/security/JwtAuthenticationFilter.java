package com.smartparking.security;

import java.io.IOException;
import java.util.Collections;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
                   
    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");
       

        System.out.println("========== JWT FILTER ==========");
        System.out.println("REQUEST: " + request.getRequestURI());
        System.out.println("AUTH HEADER: " + authorizationHeader);
        if (authorizationHeader == null
                || !authorizationHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring(7);

        try {
        
        	String email = jwtService.extractEmail(token);
        	String role = jwtService.extractRole(token);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            Collections.singletonList(
                            		new org.springframework.security.core.authority.SimpleGrantedAuthority(
                            				"ROLE_" + role)
                            		)
                    );

            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);

            System.out.println("JWT authenticated user: " + email);
            System.out.println("JWT role: " + role);
        } catch (Exception e) {

            System.out.println(
                    "JWT validation failed: " + e.getMessage()
            );
        }

        filterChain.doFilter(request, response);
    }
}