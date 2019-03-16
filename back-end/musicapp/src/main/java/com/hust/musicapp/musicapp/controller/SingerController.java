package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.ResourceNotFoundException;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.repository.SingerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("singer")
public class SingerController {
    @Autowired
    SingerRepository singerRepository;
    @GetMapping
    public Iterable<Singer> getAllSingers()
    {
        return singerRepository.findAll();
    }
    @PostMapping
    public Singer createSinger(@Valid @RequestBody Singer singer){
        return singerRepository.save(singer);
    }
    @GetMapping("{id}")
    public Singer getSingerById(@PathVariable("id") Long id){
        return singerRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Singer","id",id));
    }
    // Update a Note
    @PutMapping("{id}")
    public Singer updateSinger(@PathVariable(value = "id") Long singerid,
                           @Valid @RequestBody Singer singerDetail) {

        Singer singer
                = singerRepository.findById(singerid)
                .orElseThrow(() -> new ResourceNotFoundException("Singer", "id", singerid));

        singer.setName(singerDetail.getName());
        singer.setDescription(singerDetail.getDescription());
        singer.setSongs(singerDetail.getSongs());


        Singer updatedSinger = singerRepository.save(singer);
        return updatedSinger;
    }
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteSinger(@PathVariable(value = "id") Long singerId) {
        Singer note = singerRepository.findById(singerId)
                .orElseThrow(() -> new ResourceNotFoundException("Singer", "id", singerId));

        singerRepository.delete(note);

        return ResponseEntity.ok().build();
    }
    @GetMapping("{id}/songs")
    public List<Song> getAllSongsOfUser(@PathVariable Long id){
        Singer singer=singerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Singer", "id", id));
        return singerRepository.getAllSongsOfSinger(id);
    }
}