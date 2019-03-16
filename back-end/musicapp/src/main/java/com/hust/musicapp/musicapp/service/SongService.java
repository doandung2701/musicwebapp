package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Category;
import com.hust.musicapp.musicapp.model.Song;
import org.springframework.data.domain.Pageable;

import java.util.Calendar;
import java.util.List;
import java.util.Set;

public interface SongService {

    List<Song> findAll();

    List<Song> findAllWithPaging(Pageable pageable);

    Song findById(Long id);

    List<Song> findByUserId(Long id);

    List<Song> findByNameExact(String name);

    List<Song> findByNameLike(String name);

    List<Song> findBySingerId(List<Long> singerIds);

    List<Song> findByCategoriesId(List<Long> categoryIds);

    List<Song> findByAuthorId(List<Long> authorIds);

    Long count();

    Song save(Song song);

    Song getOne(Long id);

    List<Song> saveAll(List<Song> songs);
}
