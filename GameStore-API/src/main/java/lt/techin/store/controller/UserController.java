package lt.techin.store.controller;

import lombok.AllArgsConstructor;
import lt.techin.store.rest.SignInUserRequest;
import lt.techin.store.rest.SignUpUserRequest;
import lt.techin.store.service.JwtService;
import lt.techin.store.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class UserController {

    private UserService userService;
    private JwtService jwtService;
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome from secured back end!";
    }

    @PostMapping("/signUp")
    public String addNewUser(@RequestBody SignUpUserRequest signUpUserRequest) {

        return userService.addUser(signUpUserRequest);
    }

    @PostMapping("/signIn")
    public String generateToken(@RequestBody SignInUserRequest signInUserRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInUserRequest.getUsername(),signInUserRequest.getPassword()));
        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(signInUserRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("Invalid username or password");
        }
    }

}
