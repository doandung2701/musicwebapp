package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Author;
import com.hust.musicapp.musicapp.payload.ArtistPayload;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AuthorService {

    List<Author> findAll();

    Author findById(Long id);

    List<Author> findByName(String name);

    Author save(Author author);

    List<Author> saveAll(List<Author> author);

    Long count();

    void deleteAuthor(Author a);

    List<Author> findAllWithPaging(Pageable pageable);
    List<ArtistPayload> getArtitst(Pageable pageable,String orderParam);
    List<ArtistPayload>findByNameLike(String authorName);
}
