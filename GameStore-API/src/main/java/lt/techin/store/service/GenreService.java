package lt.techin.store.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lt.techin.store.model.Genre;
import lt.techin.store.repository.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class GenreService {

    private final GenreRepository genreRepository;

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public Genre getGenreById(Long id) {
        return genreRepository.findById(id).get();
    }

    public Genre addGenre(String genre) {
        Genre newGenre = new Genre();
        newGenre.setName(genre);
        return genreRepository.save(newGenre);
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
