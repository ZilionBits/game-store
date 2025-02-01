package lt.techin.store.runner;

import lombok.AllArgsConstructor;
import lt.techin.store.rest.SignUpUserRequest;
import lt.techin.store.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class InitialUsers implements CommandLineRunner {

    private UserService userService;

    @Override
    public void run(String... args) throws Exception {

        SignUpUserRequest admin = new SignUpUserRequest();

        admin.setUsername("admin");
        admin.setPassword("123456");
        admin.setEmail("admin@gmail.com");
        admin.setRoles("ROLE_ADMIN");

        userService.addUser(admin);

        SignUpUserRequest user = new SignUpUserRequest();

        user.setUsername("user");
        user.setPassword("123456");
        user.setEmail("user@gmail.com");
        user.setRoles("ROLE_USER");

        userService.addUser(user);

    }
}
