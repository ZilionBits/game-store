package lt.techin.store.controller;

import lombok.AllArgsConstructor;
import lt.techin.store.rest.dto.GenreDto;
import lt.techin.store.service.GenreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/genres")
public class GenreController {

    static final String MESSAGE = "message";
    private final GenreService genreService;

    @GetMapping
    public ResponseEntity<List<GenreDto>> findAllGenres() {
        return ResponseEntity.status(HttpStatus.OK).body(genreService.getAllGenres());
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> addGenre(@RequestParam String genre) {
        String response = genreService.addGenre(genre);

        if(response.equals("Genre " + genre + " created")){
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(MESSAGE, response));
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(MESSAGE, response));
    }

    @DeleteMapping
    public ResponseEntity<Map<String, String>> deleteGenre(@RequestParam String genre) {
        String response = genreService.deleteGenre(genre);

        if(response.equals("Genre " + genre + " deleted")) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(Map.of(MESSAGE, response));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of(MESSAGE, response));
    }
}
