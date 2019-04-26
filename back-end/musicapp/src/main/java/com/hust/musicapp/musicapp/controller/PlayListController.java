package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.service.PlayListService;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playlist")
@CrossOrigin("*")
public class PlayListController {

    @Autowired
    PlayListService playListService;

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll() {
        List<PlayList> songs = playListService.findAll();
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/count/count-all")
    public ResponseEntity<Long> countAll() {
        return ResponseEntity.ok(playListService.count());
    }

    @GetMapping("/find-paging")
    public ResponseEntity<?> findPaging(@RequestParam("page") Integer page,
                                        @RequestParam("rows") Integer rows,
                                        @Nullable @RequestParam("orderBy") String order,
                                        @Nullable @RequestParam("direction") String direction) {

        Pageable pageable = PageableUtil.getPageable(page, rows, order, direction);
        return ResponseEntity.ok(playListService.findAllPaging(pageable));
    }

    @GetMapping("/find-by-user-id")
    public ResponseEntity<?> findByUserId(@RequestParam("id") Long id) {
        return ResponseEntity.ok(playListService.findByUserId(id));
    }

    @GetMapping("/find-by-name/")
    public ResponseEntity<?> findByName( @RequestParam("name") String name) {
        return ResponseEntity.ok(playListService.findByName(name));
    }

    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(playListService.findById(id));
    }

    @PostMapping("/save-playlist")
    public ResponseEntity<?> addPlaylist(@RequestBody PlayList playlist) {
        return ResponseEntity.ok(playListService.save(playlist));
    }

    @PutMapping("/save-playlist")
    public ResponseEntity<?> updatePlaylist(@RequestBody PlayList playlist) {
        return ResponseEntity.ok(playListService.save(playlist));
    }

    @DeleteMapping("/delete-playlist")
    public ResponseEntity<?> deletePlaylist(@RequestParam("id") Long id) {
        PlayList p = playListService.findById(id);
        if (p!=null) {
            playListService.delete(p);
            return ResponseEntity.ok("Delete Sucessfully!");
        }
        else return  ResponseEntity.notFound().build();
    }

}
