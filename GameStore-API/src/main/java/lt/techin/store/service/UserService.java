package lt.techin.store.service;


import lt.techin.store.model.User;
import lt.techin.store.repository.UserRepository;
import lt.techin.store.rest.SignUpUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);


        return user.map(UserDetailsImpl::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public String addUser(SignUpUserRequest request) {
        String roles = "ROLE_USER";
        if (request.getRoles() != null) {
            roles = request.getRoles();
        }
        request.setPassword(passwordEncoder.encode(request.getPassword()));

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setRoles(roles);
        userRepository.save(user);

        return "User added successfully: " + request.getUsername();
    }

}
