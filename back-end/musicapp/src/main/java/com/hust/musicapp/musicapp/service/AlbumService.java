package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Album;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlbumService {

    List<Album> findAll();

    List<Album> findAllWithPaging(Pageable pageable);

    List<Album> findByNameLike(String ablumName);

    Album findById(Long id);

    List<Album> findDistinctBySingerId(Long singerId);


    Long count();

    Album save(Album album);

    void deleteAlbum(Album album);
}
