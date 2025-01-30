package lt.techin.store.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lt.techin.store.rest.dto.GameDto;
import lt.techin.store.service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class GameController {

    private final GameService gameService;

    @GetMapping
    public ResponseEntity<List<GameDto>> getAllGames() {
        return ResponseEntity.status(HttpStatus.OK).body(gameService.getAllGames());
    }

    @PostMapping
    public ResponseEntity<GameDto> createGame(@RequestBody @Valid GameDto gameDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gameService.addGame(gameDto));
    }

}
