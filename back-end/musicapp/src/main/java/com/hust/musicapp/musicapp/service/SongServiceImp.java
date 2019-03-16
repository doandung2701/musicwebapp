package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.repository.SongRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
@Service
@Transactional
public class SongServiceImp implements SongService {

    @Autowired
    private SongRepo songRepo;

    @Override
    public List<Song> findAll() {
        List<Song> songs = new ArrayList<>();
        songRepo.findAll().forEach(song->{
            songs.add(song);
        });
        return songs;
    }

    @Override
    public List<Song> findAllWithPaging(Pageable pageable) {
        return songRepo.findAll(pageable).getContent();
    }

    @Override
    public Song findById(Long id) {
        return songRepo.findById(id).get();
    }

    @Override
    public List<Song> findByUserId(Long id) {
        return songRepo.findByUserId(id);
    }

    @Override
    public List<Song> findByNameExact(String name) {
        return songRepo.findByNameExact(name);
    }

    @Override
    public List<Song> findByNameLike(String name) {
        return songRepo.findByNameLike(name);
    }

    @Override
    public List<Song> findBySingerId(List<Long> singerIds) {
        return songRepo.findBySingerId(singerIds);
    }

    @Override
    public List<Song> findByCategoriesId(List<Long> categoryIds) {
        return songRepo.findByCategoriesId(categoryIds);
    }

    @Override
    public List<Song> findByAuthorId(List<Long> authorIds) {
        return songRepo.findByAuthorId(authorIds);
    }

    public Long count(){
        return songRepo.count();
    }

    @Override
    public Song save(Song song) {
        return songRepo.save(song);
    }

    @Override
    public Song getOne(Long id){
        return songRepo.getOne(id);
    }

    @Override
    public List<Song> saveAll(List<Song> songs) {
        return songRepo.saveAll(songs);
    }

    @Override
    public void deleteSong(Song song) {
        songRepo.delete(song);
    }
}
