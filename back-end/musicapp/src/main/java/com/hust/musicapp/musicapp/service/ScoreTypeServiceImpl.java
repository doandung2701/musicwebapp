package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.ScoreType;
import com.hust.musicapp.musicapp.repository.ScoreTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ScoreTypeServiceImpl implements ScoreTypeService{
    @Autowired
    ScoreTypeRepository scoreTypeRepository;
    @Override
    public List<ScoreType> findAll() {
        return scoreTypeRepository.findAll();
    }

    @Override
    public List<ScoreType> findAllWithPaging(Pageable pageable) {
        return scoreTypeRepository.findAll(pageable).getContent();
    }

    @Override
    public ScoreType save(@Valid ScoreType scoreType) {
        return scoreTypeRepository.save(scoreType);
    }

    @Override
    public Optional<ScoreType> findById(Long id) {
        return scoreTypeRepository.findById(id);
    }

    @Override
    public void delete(ScoreType id) {
         scoreTypeRepository.delete(id);
    }
}
