package lt.techin.store.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lt.techin.store.model.Game;
import lt.techin.store.repository.GameRepository;
import lt.techin.store.rest.dto.GameDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class GameService {

    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game getGameById(Long id) {
        return gameRepository.findById(id).get();
    }

    public void addGame(GameDto gameDto) {
        Game newGame = new Game();
        newGame.setName(gameDto.getName());
        newGame.setImageUrl(gameDto.getImageUrl());
        newGame.setMetaScore(gameDto.getMetaScore());
        newGame.setPrice(gameDto.getPrice());
        newGame.setPlatforms(gameDto.getPlatforms());
        newGame.setGenres(gameDto.getGenres());
        gameRepository.save(newGame);

        new GameDto(newGame);
    }


}
