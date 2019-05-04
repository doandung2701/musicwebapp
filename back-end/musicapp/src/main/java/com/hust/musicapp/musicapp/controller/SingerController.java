package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.ResourceNotFoundException;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.payload.SingerResponse;
import com.hust.musicapp.musicapp.repository.SingerRepository;
import com.hust.musicapp.musicapp.service.SingerService;
import com.hust.musicapp.musicapp.service.SongService;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/singers")
@CrossOrigin("*")
public class SingerController {

    @Autowired
    SingerService singerRepository;

    @Autowired
    SongService songService;

    @GetMapping("/find/find-all")
    public Iterable<Singer> getAllSingers()
    {
        return singerRepository.findAll();
    }

    @GetMapping("/find-paging")
    public ResponseEntity<?> findPaging(@RequestParam("page") Integer page,
                                        @RequestParam("rows") Integer rows,
                                        @Nullable @RequestParam("orderBy") String order,
                                        @Nullable @RequestParam("direction") String direction) {

        Pageable pageable = PageableUtil.getPageable(page, rows, order, direction);
        List<Singer> singers = singerRepository.findALlWithPaging(pageable);
        ArrayList<SingerResponse> singerResponses = new ArrayList<>();
        for (Singer s: singers){
            SingerResponse response = new SingerResponse(s);
            response.setSongCount(songService.countDistinctBySingers(s));
            singerResponses.add(response);
        }
        return ResponseEntity.ok(singerResponses);
    }

    @PostMapping("/save/create-singer")
    public Singer createSinger(@Valid @RequestBody Singer singer){
        return singerRepository.save(singer);
    }

    @GetMapping("/find/by-id/{id}")
    public SingerResponse getSingerById(@PathVariable("id") Long id){
        Singer s= singerRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Singer","id",id));
        SingerResponse response = new SingerResponse(s);
        response.setSongCount(songService.countDistinctBySingers(s));
        return response;
    }
    @PutMapping("/save/update-singer/{id}")
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

    @GetMapping("/find-by-name")
    public ResponseEntity<?> findByNameLike(@RequestParam("name") String name){
        List<Singer> singers = singerRepository.findByNameLike(name);
        ArrayList<SingerResponse> singerResponses = new ArrayList<>();
        for (Singer s: singers){
            SingerResponse response = new SingerResponse(s);
            response.setSongCount(songService.countDistinctBySingers(s));
            singerResponses.add(response);
        }
        return ResponseEntity.ok(singerResponses);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSinger(@PathVariable(value = "id") Long singerId) {
        Singer note = singerRepository.findById(singerId)
                .orElseThrow(() -> new ResourceNotFoundException("Singer", "id", singerId));

        singerRepository.deleteSinger(note);

        return ResponseEntity.ok().build();
    }
    @GetMapping("/find/songs-by-id/{id}")
    public List<Song> getAllSongsOfUser(@PathVariable Long id){
        Singer singer=singerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Singer", "id", id));
        return singerRepository.getAllSongsOfSinger(id);
    }

}
