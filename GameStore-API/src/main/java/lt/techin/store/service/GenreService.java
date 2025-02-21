package lt.techin.store.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lt.techin.store.model.Genre;
import lt.techin.store.repository.GenreRepository;
import lt.techin.store.rest.dto.GenreDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class GenreService {

    private final GenreRepository genreRepository;

    public List<GenreDto> getAllGenres() {
        return genreRepository.findAll().stream().map(GenreDto::new).toList();
    }

    public String addGenre(String genre) {
        if(genreRepository.findByName(genre) != null){
            return "Genre " + genre + " already exists";
        }
        Genre newGenre = new Genre();
        newGenre.setName(genre);
        genreRepository.save(newGenre);
        return "Genre " + genre + " created";
    }

    public String deleteGenre(String genre) {
        Long genreId = null;
        try {
            genreId = genreRepository.findByName(genre).getId();
            genreRepository.deleteById(genreId);
        } catch (Exception ex) {
            return "Genre " + genre + " not found";
        }
        return "Genre " + genre + " deleted";
    }

}
