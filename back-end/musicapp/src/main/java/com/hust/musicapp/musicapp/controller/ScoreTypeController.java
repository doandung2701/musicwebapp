package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.ResourceNotFoundException;
import com.hust.musicapp.musicapp.model.ScoreType;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.repository.ScoreTypeRepository;
import com.hust.musicapp.musicapp.service.ScoreTypeService;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("score-types")
@CrossOrigin("*")
public class ScoreTypeController {
    @Autowired
    private ScoreTypeService scoreTypeService;

    @GetMapping("find-all")
    public Iterable<ScoreType> getAllScoretypes()
    {
        return scoreTypeService.findAll();
    }
    @PostMapping("save-score-types")
    public ScoreType createScoreType(@Valid @RequestBody ScoreType scoreType){
        return scoreTypeService.save(scoreType);
    }
    @GetMapping("find-all-with-paging")
    public ResponseEntity<?> findAllWithPaging(@RequestParam("page") Integer page,
                                             @RequestParam("rows") Integer row,
                                             @Nullable @RequestParam("orderBy") String order,
                                             @Nullable @RequestParam("direction")String direction){
        Pageable pageable= PageableUtil.getPageable(page,row,order,direction);
        return ResponseEntity.ok(scoreTypeService.findAllWithPaging(pageable));
    }
    @GetMapping("find-by-id/{id}")
    public ScoreType getScoreTypeById(@PathVariable("id") Long id){
        return scoreTypeService.findById(id).orElseThrow(()->new ResourceNotFoundException("ScoreType","id",id));
    }
    // Update a Note
    @PutMapping("/save-score-types/{id}")
    public ScoreType updateScoreType(@PathVariable(value = "id") Long scoretypeid,
                               @Valid @RequestBody ScoreType request) {
        ScoreType scoreType
                = scoreTypeService.findById(scoretypeid)
                .orElseThrow(() -> new ResourceNotFoundException("ScoreType", "id", scoretypeid));

        scoreType.setScoreValue(request.getScoreValue());
        scoreType.setRates(request.getRates());

        ScoreType updatedScore = scoreTypeService.save(scoreType);
        return updatedScore;
    }
    @DeleteMapping("/delete-score-types/{id}")
    public ResponseEntity<?> deleteScoreType(@PathVariable(value = "id") Long scoretypeId) {
        ScoreType scoreType = scoreTypeService.findById(scoretypeId)
                .orElseThrow(() -> new ResourceNotFoundException("ScoreType", "id", scoretypeId));

        scoreTypeService.delete(scoreType);

        return ResponseEntity.ok().build();
    }
}
