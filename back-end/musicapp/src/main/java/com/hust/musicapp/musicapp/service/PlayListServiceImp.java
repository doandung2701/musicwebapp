package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.repository.PlaylistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Repository
@Transactional
public class PlayListServiceImp implements PlayListService {

    @Autowired
    PlaylistRepo repo;

    @Override
    public PlayList findById(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public List<PlayList> findByName(String name) {
        return repo.findByName(name);
    }

    @Override
    public PlayList save(PlayList p) {
        return repo.save(p);
    }

    @Override
    public Long count() {
        return repo.count();
    }

    @Override
    public void delete(PlayList p) {
        repo.delete(p);
    }

    @Override
    public List<PlayList> findAllPaging(Pageable pageable) {
        return repo.findAll(pageable).getContent();
    }

    @Override
    public List<PlayList> findAll() {
        return repo.findAll();
    }

    @Override
    public List<PlayList> findByUserId(Long userId) {
        return repo.findByUserId(userId);
    }
}
