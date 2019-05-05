package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumRepo extends JpaRepository<Album,Long> {
    List<Album> findByAlbumNameLike(String albumName);

    List<Album> findDistinctBySingerId(Long singerId);
}
