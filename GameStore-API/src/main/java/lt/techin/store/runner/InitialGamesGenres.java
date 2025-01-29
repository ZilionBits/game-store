package lt.techin.store.runner;

import lombok.AllArgsConstructor;
import lt.techin.store.model.Game;
import lt.techin.store.model.Genre;
import lt.techin.store.model.Platform;
import lt.techin.store.repository.GameRepository;
import lt.techin.store.service.GenreService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Set;

@AllArgsConstructor
@Component
public class InitialGamesGenres implements CommandLineRunner {

    private GenreService genreService;
    private GameRepository gameRepository;

    @Override
    public void run(String... args) throws Exception {

        Genre action = genreService.addGenre("Action");
        Genre adventure = genreService.addGenre("Adventure");
        Genre shooter = genreService.addGenre("Shooter");
        Genre multiplayer = genreService.addGenre("Multiplayer");
        Genre horror = genreService.addGenre("Horror");
        Genre storyRich = genreService.addGenre("Story-rich");
        Genre sciFi = genreService.addGenre("Sci-Fi");
        Genre coOp = genreService.addGenre("Co-op");
        Genre cartoonish = genreService.addGenre("Cartoonish");

        // Grand Theft Auto V
        Game gtaV = new Game();
        gtaV.setName("Grand Theft Auto V");
        gtaV.setImageUrl("https://media.rawg.io/media/crop/600/400/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg");
        gtaV.setMetaScore(92);
        gtaV.setPrice(BigDecimal.valueOf(27.99));
        gtaV.setPlatforms(Set.of(Platform.PC, Platform.PLAYSTATION, Platform.XBOX));
        gtaV.setGenres(Set.of(action, adventure));
        gameRepository.save(gtaV);

        // Counter-Strike: Global Offensive
        Game csGo = new Game();
        csGo.setName("Counter-Strike: Global Offensive");
        csGo.setImageUrl("https://media.rawg.io/media/crop/600/400/games/736/73619bd336c894d6941d926bfd563946.jpg");
        csGo.setMetaScore(81);
        csGo.setPrice(BigDecimal.ZERO); // Free-to-play
        csGo.setPlatforms(Set.of(Platform.PC, Platform.PLAYSTATION, Platform.XBOX, Platform.LINUX));
        csGo.setGenres(Set.of(shooter, multiplayer));
        gameRepository.save(csGo);

        // Left 4 Dead 2
        Game left4Dead2 = new Game();
        left4Dead2.setName("Left 4 Dead 2");
        left4Dead2.setImageUrl("https://media.rawg.io/media/crop/600/400/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg");
        left4Dead2.setMetaScore(89);
        left4Dead2.setPrice(BigDecimal.valueOf(8.99));
        left4Dead2.setPlatforms(Set.of(Platform.PC, Platform.XBOX, Platform.MAC, Platform.LINUX));
        left4Dead2.setGenres(Set.of(action, horror, shooter));
        gameRepository.save(left4Dead2);

        // BioShock Infinite
        Game bioShockInfinite = new Game();
        bioShockInfinite.setName("BioShock Infinite");
        bioShockInfinite.setImageUrl("https://media.rawg.io/media/crop/600/400/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg");
        bioShockInfinite.setMetaScore(94);
        bioShockInfinite.setPrice(BigDecimal.valueOf(17.99));
        bioShockInfinite.setPlatforms(Set.of(Platform.PC, Platform.PLAYSTATION, Platform.XBOX, Platform.LINUX, Platform.NINTENDO));
        bioShockInfinite.setGenres(Set.of(action, adventure, storyRich));
        gameRepository.save(bioShockInfinite);

        // Half-Life 2
        Game halfLife2 = new Game();
        halfLife2.setName("Half-Life 2");
        halfLife2.setImageUrl("https://media.rawg.io/media/crop/600/400/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg");
        halfLife2.setMetaScore(96);
        halfLife2.setPrice(BigDecimal.valueOf(8.99));
        halfLife2.setPlatforms(Set.of(Platform.PC, Platform.XBOX, Platform.ANDROID, Platform.MAC, Platform.LINUX));
        halfLife2.setGenres(Set.of(action, sciFi, shooter));
        gameRepository.save(halfLife2);

        // PAYDAY 2
        Game payday2 = new Game();
        payday2.setName("PAYDAY 2");
        payday2.setImageUrl("https://media.rawg.io/media/crop/600/400/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg");
        payday2.setMetaScore(79);
        payday2.setPrice(BigDecimal.valueOf(4.49));
        payday2.setPlatforms(Set.of(Platform.PC, Platform.XBOX, Platform.LINUX));
        payday2.setGenres(Set.of(action, coOp, shooter));
        gameRepository.save(payday2);

        // Team Fortress 2
        Game teamFortress2 = new Game();
        teamFortress2.setName("Team Fortress 2");
        teamFortress2.setImageUrl("https://media.rawg.io/media/crop/600/400/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg");
        teamFortress2.setMetaScore(92);
        teamFortress2.setPrice(BigDecimal.ZERO); // Free-to-play
        teamFortress2.setPlatforms(Set.of(Platform.PC, Platform.MAC, Platform.LINUX));
        teamFortress2.setGenres(Set.of(shooter, multiplayer, cartoonish));
        gameRepository.save(teamFortress2);

    }
}
