package lt.techin.store.rest.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.store.model.Genre;

@Data
@NoArgsConstructor
public class GenreDto {

    private Long id;
    private String name;

    public GenreDto(Genre genre) {
        this.id = genre.getId();
        this.name = genre.getName();
    }
}
