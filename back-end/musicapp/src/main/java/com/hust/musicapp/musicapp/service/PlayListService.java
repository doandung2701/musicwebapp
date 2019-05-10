package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.PlayList;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PlayListService {

    PlayList findById(Long id);

    List<PlayList> findByName(String name);

    PlayList save(PlayList p);

    List<PlayList> findDistinctByIdIn(List<Long> ids);

    List<PlayList> saveAll(List<PlayList> playLists);

    Long count();

    void delete(PlayList p);

    List<PlayList> findAllPaging(Pageable pageable);

    List<PlayList> findAll();

    List<PlayList> findByUserId(Long userId);

}
