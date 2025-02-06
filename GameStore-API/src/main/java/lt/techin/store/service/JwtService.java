package lt.techin.store.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {

    public static final String SECRET_KEY = "e0ba853913752f1f6a65a24f6303e16f24fa77e6006854317994670202a245587926a75b631a5067ff1e05a226c0561809380936b48ff849d0200312ef675e63c92c988560c6629a1d4023a813ba43c215de69247af140abd1fe87761c513917fe5d8236af97335432e40c3ab24231af11dee555b4bb53f149be1ac37a98c9fa767d3107b047c8f29c28d9ea9ddf92f1ac7a91ee2b7fc457e2d3a8ae4ae7ff20377c18762057acbc1dbf0e8fcdc52bcaef2bcfa65729a8436e9c49e04d76371f8879250e5ea7af4f806a64e90dad53f29313ea1d67427e7e8afb0bb5a253bfeddd7d063dc7c03d230a1c71dfcad52c2bc6debbd64250295dda7ca68a1b5e6bc9";

    public String generateToken(UserDetailsImpl userDetails) {
        Map<String, String> claims = new HashMap<>();
        claims.put("username", userDetails.getUsername());
        claims.put("password", userDetails.getPassword());
        claims.put("email", userDetails.getEmail());
        claims.put("roles", userDetails.getAuthorities().toString());
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, String> claims, String subject) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                .signWith(getSignKey())
                .compact();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
