package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Album;
import com.hust.musicapp.musicapp.repository.AlbumRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AlbumServiceImpl implements AlbumService{
    @Autowired
    private AlbumRepo albumRepo;

    @Override
    public List<Album> findAll() {
        return albumRepo.findAll();
    }

    @Override
    public List<Album> findAllWithPaging(Pageable pageable) {
        return albumRepo.findAll(pageable).getContent();
    }

    @Override
    public List<Album> findByNameLike(String ablumName) {
        return albumRepo.findByAlbumNameLike(ablumName);
    }

    @Override
    public Album findById(Long id) {
        return albumRepo.getDetailAlbumById(id).get();
    }

    @Override
    public Long count() {
        return albumRepo.count();
    }

    @Override
    public Album save(Album album) {
        return albumRepo.save(album);
    }

    @Override
    public void deleteAlbum(Album album) {
        albumRepo.delete(album);
    }
}
