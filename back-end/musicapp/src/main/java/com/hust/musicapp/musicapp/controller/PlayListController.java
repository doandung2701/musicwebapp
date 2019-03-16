package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.service.PlayListService;
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

    @GetMapping("/count")
    public ResponseEntity<Long> countAll() {
        return ResponseEntity.ok(playListService.count());
    }

    @GetMapping("/find-paging")
    public ResponseEntity<?> findPaging(@RequestParam("page") Integer page,
                                        @RequestParam("rows") Integer rows,
                                        @Nullable @RequestParam("orderBy") String order,
                                        @Nullable @RequestParam("direction") String direction) {

        Pageable pageable = null;
        Sort sort = null;
        if (order == null && direction == null) {
            pageable = PageRequest.of(page - 1, rows);
        } else if (order != null && direction != null) {
            if (direction.equalsIgnoreCase("desc")) {
                sort = new Sort(Sort.Direction.DESC, order);
            } else {
                sort = new Sort(Sort.Direction.ASC, order);
            }
            pageable = PageRequest.of(page - 1, rows, sort);
        } else {
            pageable = PageRequest.of(page - 1, rows);
        }
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

    @PostMapping("/save-comment")
    public ResponseEntity<?> addComment(@RequestBody PlayList playlist) {
        return ResponseEntity.ok(playListService.save(playlist));
    }

    @PutMapping("/save-playlist")
    public ResponseEntity<?> updateComment(@RequestBody PlayList playlist) {
        return ResponseEntity.ok(playListService.save(playlist));
    }

    @DeleteMapping("/delete-playlist")
    public ResponseEntity<?> deleteComment(@RequestBody PlayList playlist) {
        PlayList p = playListService.findById(playlist.getId());
        if (p!=null) {
            playListService.delete(p);
            return ResponseEntity.ok("Delete Sucessfully!");
        }
        else return  ResponseEntity.notFound().build();
    }

}
