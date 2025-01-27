package lt.techin.store.runner;

import lombok.AllArgsConstructor;
import lt.techin.store.model.Game;
import lt.techin.store.model.Genre;
import lt.techin.store.model.Platform;
import lt.techin.store.repository.GameRepository;
import lt.techin.store.repository.GenreRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@Component
public class InitialGames implements CommandLineRunner {

    private GameRepository gameRepository;
    private GenreRepository genreRepository;

    @Override
    public void run(String... args) throws Exception {

        Genre genre = new Genre();
        genre.setName("Action");
        genreRepository.save(genre);

        Game game = new Game();

        game.setName("Game Store");
        game.setPrice("9.99");
        game.setMetaScore(99);
        game.setImageUrl("google.com");
        game.setPlatforms(Set.of(Platform.PC,Platform.MAC,Platform.ANDROID));
        game.setGenres(Set.of(genre));

        gameRepository.save(game);

        System.out.println(game);


    }
}
