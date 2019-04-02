package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Author;

import java.util.List;

public interface AuthorService {

    List<Author> findAll();

    Author findById(Long id);

    List<Author> findByName(String name);

    Author save(Author author);

    List<Author> saveAll(List<Author> author);

    Long count();

    void deleteAuthor(Author a);
}