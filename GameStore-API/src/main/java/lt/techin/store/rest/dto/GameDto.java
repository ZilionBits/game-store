package lt.techin.store.rest.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.store.model.Game;
import lt.techin.store.model.Genre;
import lt.techin.store.model.Platform;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
public class GameDto {

    private Long id;
    private String name;
    private String imageUrl;
    private int metaScore;
    private BigDecimal price;
    private Set<Platform> platforms = new HashSet<>();
    private Set<Genre> genres = new HashSet<>();

    public GameDto(Game game) {
        this.id = game.getId();
        this.name = game.getName();
        this.imageUrl = game.getImageUrl();
        this.metaScore = game.getMetaScore();
        this.price = game.getPrice();
        this.platforms.addAll(game.getPlatforms());
        this.genres.addAll(game.getGenres());
    }
}
