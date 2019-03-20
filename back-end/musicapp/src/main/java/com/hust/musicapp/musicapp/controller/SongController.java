package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.service.SongService;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/songs")//all request starting with /songs goes here
@CrossOrigin("*")//enable cross origin resources sharing
public class SongController {

    @Autowired
    private SongService songService;



    @GetMapping("/find-all")
    public ResponseEntity<?> findAll() {
        List<Song> songs = songService.findAll();
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countAll() {
        return ResponseEntity.ok(songService.count());
    }

    @GetMapping("/find-paging")
    public ResponseEntity<?> findPaging(@RequestParam("page") Integer page,
                                        @RequestParam("rows") Integer rows,
                                        @Nullable @RequestParam("orderBy") String order,
                                        @Nullable @RequestParam("direction") String direction) {

        Pageable pageable = PageableUtil.getPageable(page, rows, order, direction);
        return ResponseEntity.ok(songService.findAllWithPaging(pageable));
    }

    @GetMapping("/find-by-singer-ids")
    public ResponseEntity<?> findBySingers(@RequestParam("ids") List<Long> ids) {
        return ResponseEntity.ok(songService.findBySingerId(ids));
    }

    @GetMapping("/find-by-author-ids")
    public ResponseEntity<?> findByAuthors(@RequestParam("ids") List<Long> ids) {
        return ResponseEntity.ok(songService.findByAuthorId(ids));
    }

    @GetMapping("/find-by-category-ids")
    public ResponseEntity<?> findByCategories(@RequestParam("ids") List<Long> ids) {
        return ResponseEntity.ok(songService.findByCategoriesId(ids));
    }

    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(songService.findById(id));
    }

    @GetMapping("/find-by-name")
    public ResponseEntity<?> findByName( @RequestParam("name") String name) {
        return ResponseEntity.ok(songService.findByNameLike(name));
    }

    @PostMapping("/save-songs")
    public ResponseEntity<?> addSong(@RequestBody List<Song> songs) {
        return ResponseEntity.ok(songService.saveAll(songs));
    }

    @PutMapping("/save-songs")
    public ResponseEntity<?> updateSong(@RequestBody List<Song> songs) {
        return ResponseEntity.ok(songService.saveAll(songs));
    }

    @DeleteMapping("/delete-song")
    public ResponseEntity<?> deleteSong(@RequestBody Song song) {
        Song s = songService.findById(song.getSongId());
        if (s!=null) {
            songService.deleteSong(s);
            return ResponseEntity.ok("Delete Sucessfully!");
        }
        else return  ResponseEntity.notFound().build();
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        sdf.setLenient(true);
        binder.registerCustomEditor(java.sql.Date.class, new CustomDateEditor(sdf, true));
    }

}


