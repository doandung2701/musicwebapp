package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlbumRepo extends JpaRepository<Album,Long> {
    List<Album> findByAlbumNameLike(String albumName);
    @Query("select distinct a from Album  a left  outer join  a.songs left outer join a.singer where a.id=:id")
    Optional<Album> getDetailAlbumById(@Param("id") Long id);
}
