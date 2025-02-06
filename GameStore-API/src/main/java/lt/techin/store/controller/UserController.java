package lt.techin.store.controller;

import lombok.AllArgsConstructor;
import lt.techin.store.model.User;
import lt.techin.store.rest.SignInUserRequest;
import lt.techin.store.rest.SignUpUserRequest;
import lt.techin.store.service.JwtService;
import lt.techin.store.service.UserDetailsImpl;
import lt.techin.store.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class UserController {

    private UserService userService;
    private JwtService jwtService;
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome from secured Admin only back end page!";
    }

    @PostMapping("/signUp")
    public ResponseEntity<Map<String, String>> addNewUser(@RequestBody SignUpUserRequest signUpUserRequest) {
        String message = userService.addUser(signUpUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", message));
    }

    @PostMapping("/signIn")
    public ResponseEntity<Map<String, String>> generateToken(@RequestBody SignInUserRequest signInUserRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInUserRequest.getUsername(),signInUserRequest.getPassword()));

            UserDetailsImpl user = (UserDetailsImpl) userService.loadUserByUsername(signInUserRequest.getUsername());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of("token",jwtService.generateToken(user)));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Invalid username or password"));
        }
    }

}
