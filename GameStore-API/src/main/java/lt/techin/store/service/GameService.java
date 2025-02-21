package lt.techin.store.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lt.techin.store.model.Game;
import lt.techin.store.model.Genre;
import lt.techin.store.repository.GameRepository;
import lt.techin.store.repository.GenreRepository;
import lt.techin.store.rest.dto.GameDto;
import lt.techin.store.rest.dto.GenreDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class GameService {

    private final GameRepository gameRepository;
    private final GenreRepository genreRepository;

    public List<GameDto> getAllGames() {
        return gameRepository.findAll().stream().map(GameDto::new).toList();
    }

    public GameDto addGame(GameDto gameDto) {
        Game game = new Game();

        updateGameEntity(gameDto, game);

        return new GameDto(game);
    }

    public String deleteGame(Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Game with ID: %d not found.", gameId)));
        if(game != null) {
            gameRepository.delete(game);
        }
        return String.format("Game with ID: %d deleted.", gameId);
    }

    public String editGame(GameDto gameDto) {
        Game game = gameRepository.findById(gameDto.getId())
                .orElseThrow(() -> new EntityNotFoundException(String.format("Game with ID: %d not found.", gameDto.getId())));

        if (game != null) {
            updateGameEntity(gameDto, game);
        }

        return String.format("Game with ID: %d updated.", gameDto.getId());
    }

    private void updateGameEntity(GameDto gameDto, Game game) {

        game.setName(gameDto.getName());
        game.setImageUrl(gameDto.getImageUrl());
        game.setMetaScore(gameDto.getMetaScore());
        game.setPrice(gameDto.getPrice());
        game.setPlatforms(gameDto.getPlatforms());

        Set<String> dtoGenresName = gameDto.getGenres().stream().map(GenreDto::getName).collect(Collectors.toSet());

        Set<Genre> genres = genreRepository.findAll().stream()
                .filter(genre -> dtoGenresName.contains(genre.getName()))
                .collect(Collectors.toSet());
        game.setGenres(genres);

        gameRepository.save(game);
    }


}
