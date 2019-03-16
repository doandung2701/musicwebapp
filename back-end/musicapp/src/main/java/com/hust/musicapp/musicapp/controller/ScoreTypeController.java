package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.ResourceNotFoundException;
import com.hust.musicapp.musicapp.model.ScoreType;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.repository.ScoreTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("score-type")
public class ScoreTypeController {
    @Autowired
    private ScoreTypeRepository scoreTypeRepository;
    @GetMapping
    public Iterable<ScoreType> getAllScoretypes()
    {
        return scoreTypeRepository.findAll();
    }
    @PostMapping
    public ScoreType createScoreType(@Valid @RequestBody ScoreType scoreType){
        return scoreTypeRepository.save(scoreType);
    }
    @GetMapping("{id}")
    public ScoreType getScoreTypeById(@PathVariable("id") Long id){
        return scoreTypeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("ScoreType","id",id));
    }
    // Update a Note
    @PutMapping("{id}")
    public ScoreType updateScoreType(@PathVariable(value = "id") Long scoretypeid,
                               @Valid @RequestBody ScoreType request) {
        ScoreType scoreType
                = scoreTypeRepository.findById(scoretypeid)
                .orElseThrow(() -> new ResourceNotFoundException("ScoreType", "id", scoretypeid));

        scoreType.setScoreValue(request.getScoreValue());
        scoreType.setRates(request.getRates());

        ScoreType updatedScore = scoreTypeRepository.save(scoreType);
        return updatedScore;
    }
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteScoreType(@PathVariable(value = "id") Long scoretypeId) {
        ScoreType scoreType = scoreTypeRepository.findById(scoretypeId)
                .orElseThrow(() -> new ResourceNotFoundException("ScoreType", "id", scoretypeId));

        scoreTypeRepository.delete(scoreType);

        return ResponseEntity.ok().build();
    }
}
