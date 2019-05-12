package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

public interface SingerService {
    Iterable<Singer> findAll();

    List<Singer> findALlWithPaging(Pageable pageable);

    Singer save(@Valid Singer singer);

    Optional<Singer> findById(Long id);

    void deleteSinger(Singer singer);

    List<Song> getAllSongsOfSinger(Long id);

    List<Singer> findByNameLike(String name);

    Long countDistinctById(Long id);


}
