package lt.techin.store.rest;

import lombok.Data;

@Data
public class SignUpUserRequest {

    private String username;
    private String password;
    private String email;
    private String roles;

}
