package lt.techin.store.service;

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

    public Game getGameById(Long id) {
        return gameRepository.findById(id).get();
    }

    public GameDto addGame(GameDto gameDto) {
        Game newGame = new Game();
        newGame.setName(gameDto.getName());
        newGame.setImageUrl(gameDto.getImageUrl());
        newGame.setMetaScore(gameDto.getMetaScore());
        newGame.setPrice(gameDto.getPrice());
        newGame.setPlatforms(gameDto.getPlatforms());

        Set<Long> genresId = gameDto.getGenres().stream().map(GenreDto::getId).collect(Collectors.toSet());

        Set<Genre> genres = genreRepository.findAll().stream()
                .filter(genre -> genresId.contains(genre.getId())).collect(Collectors.toSet());
        newGame.setGenres(genres);

        gameRepository.save(newGame);

        return new GameDto(newGame);
    }


}
