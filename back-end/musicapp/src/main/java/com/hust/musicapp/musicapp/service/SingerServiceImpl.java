package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.repository.SingerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SingerServiceImpl implements SingerService{
    @Autowired
    private SingerRepository singerRepository;

    @Override
    public Iterable<Singer> findAll() {
        return singerRepository.findAll();
    }

    @Override
    public List<Singer> findALlWithPaging(Pageable pageable) {
        return singerRepository.findAll(pageable).getContent();
    }

    @Override
    public Singer save(@Valid Singer singer) {
        return singerRepository.save(singer);
    }

    @Override
    public Optional<Singer> findById(Long id) {
        return singerRepository.findById(id);
    }

    @Override
    public void deleteSinger(Singer singer) {
    singerRepository.delete(singer);
    }

    @Override
    public List<Song> getAllSongsOfSinger(Long id) {
        return singerRepository.getAllSongsOfSinger(id  );
    }

    @Override
    public List<Singer> findByNameLike(String name) {
        return singerRepository.findByNameLike(name);
    }

    @Override
    public Long countDistinctById(Long id) {
        return singerRepository.countDistinctById(id);
    }
}
