package lt.techin.store.controller;

import lombok.AllArgsConstructor;
import lt.techin.store.service.GenreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/genres")
public class GenreController {

    private final GenreService genreService;


    @DeleteMapping
    public ResponseEntity<Map<String, String>> deleteGenre(@RequestParam String genre) {
        String response = genreService.deleteGenre(genre);

        if(response.equals("Genre " + genre + " deleted")) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(Map.of("message", response));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", response));
    }
}
