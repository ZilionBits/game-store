package lt.techin.store.controller;

import lombok.AllArgsConstructor;
import lt.techin.store.model.Platform;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/platforms")
public class PlatformController {


    @GetMapping
    public ResponseEntity<Platform[]> getPlatforms() {
        return ResponseEntity.status(HttpStatus.OK).body(Platform.values());
    }
}
