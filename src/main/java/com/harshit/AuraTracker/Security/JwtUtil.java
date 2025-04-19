package com.harshit.AuraTracker.Security;

import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private String secretKey = "9Dkfl8h38@Vns93!nfi38cnQ94fnV3mcnA47vNfi29@cnvXfi93vMCn39vncXfi";

    private Key getSigningKey()
    {
        return Keys.hmacShaKeyFor((secretKey.getBytes(StandardCharsets.UTF_8)));
    }

    public String generateToken(String regNo) {
        return Jwts.builder()
                .setSubject(regNo)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiration
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractRegNo(String token) {
        return getClaims(token).getSubject();
    }

    public boolean validateToken(String token) {
        return getClaims(token).getExpiration().after(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
