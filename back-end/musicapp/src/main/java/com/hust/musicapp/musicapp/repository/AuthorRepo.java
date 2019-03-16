package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuthorRepo extends JpaRepository<Author,Long> {

    Author findByAuthorName(String authorName);

    @Query("select a from Author a where a.authorName like %:name%")
    List<Author> findByAuthorNameLike(@Param("name") String authorName);

}
