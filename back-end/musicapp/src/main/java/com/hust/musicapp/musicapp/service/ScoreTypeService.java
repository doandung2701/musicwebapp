package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.ScoreType;
import org.springframework.data.domain.Pageable;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

public interface ScoreTypeService {
    List<ScoreType> findAll();
    List<ScoreType> findAllWithPaging(Pageable pageable);
    ScoreType save(@Valid ScoreType scoreType);
    Optional<ScoreType> findById(Long id);
    void delete(ScoreType scoreType);
}
