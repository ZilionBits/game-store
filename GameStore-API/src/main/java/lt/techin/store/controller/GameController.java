package lt.techin.store.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lt.techin.store.rest.dto.GameDto;
import lt.techin.store.service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class GameController {

    private final GameService gameService;
    private static final String MESSAGE = "message";

    @GetMapping
    public ResponseEntity<List<GameDto>> getAllGames() {
        return ResponseEntity.status(HttpStatus.OK).body(gameService.getAllGames());
    }

    @PostMapping
    public ResponseEntity<GameDto> createGame(@RequestBody @Valid GameDto gameDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gameService.addGame(gameDto));
    }

    @PutMapping
    public ResponseEntity<Map<String, String>> updateGame(@RequestBody @Valid GameDto gameDto) {
        try {
            String response = gameService.editGame(gameDto);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of(MESSAGE, response));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(MESSAGE, e.getMessage()));
        }
    }

    @DeleteMapping
    public ResponseEntity<Map<String, String>> deleteGame(@RequestBody @Valid GameDto gameDto) {
        try {
            String response = gameService.deleteGame(gameDto.getId());
            return ResponseEntity.status(HttpStatus.OK).body(Map.of(MESSAGE, response));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(MESSAGE, e.getMessage()));
        }
    }

}
