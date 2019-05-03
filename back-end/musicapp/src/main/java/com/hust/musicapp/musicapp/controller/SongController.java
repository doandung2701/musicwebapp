package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.payload.SongResponse;
import com.hust.musicapp.musicapp.service.SingerService;
import com.hust.musicapp.musicapp.service.SongService;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/songs")//all request starting with /songs go here
@CrossOrigin("*")//enable cross origin resources sharing
public class SongController {

    @Autowired
    private SongService songService;

    @Autowired
    SingerService singerService;

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll() {
        List<Song> songs = songService.findAll();
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find/find-by-cate-limit-4")
    public ResponseEntity<?> select4RandomByCategory(@RequestParam("id") Long categoryId){
        List<Song> songs=songService.select4RandomByCategory(categoryId);
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }


    @GetMapping("/count/count-all")
    public ResponseEntity<Long> countAll() {
        return ResponseEntity.ok(songService.count());
    }

    @GetMapping("/find-paging")
    public ResponseEntity<?> findPaging(@RequestParam("page") Integer page,
                                        @RequestParam("rows") Integer rows,
                                        @Nullable @RequestParam("orderBy") String order,
                                        @Nullable @RequestParam("direction") String direction) {

        Pageable pageable = PageableUtil.getPageable(page, rows, order, direction);
        List<Song> songs = songService.findAllWithPaging(pageable);
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find-paging-by-singer")
    public ResponseEntity<?> findPagingBySinger(@RequestParam("page") Integer page,
                                                 @RequestParam("rows") Integer rows,
                                                 @NotNull @RequestParam("id") Long singerId,
                                                 @Nullable @RequestParam("orderBy") String order,
                                                 @Nullable @RequestParam("direction") String direction) {

        Pageable pageable = PageableUtil.getPageable(page, rows, order, direction);
        List<Song> songs = songService.findDistinctBySingers(singerId,pageable);
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find-paging-by-user")
    public ResponseEntity<?> findPagingByUser(@RequestParam("page") Integer page,
                                                         @RequestParam("rows") Integer rows,
                                                         @NotNull @RequestParam("id") Long userId,
                                                         @Nullable @RequestParam("orderBy") String order,
                                                         @Nullable @RequestParam("direction") String direction) {

        Pageable pageable = PageableUtil.getPageable(page, rows, order, direction);
        List<Song> songs = songService.findByUserId(userId,pageable);
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find-by-singer-ids")
    public ResponseEntity<?> findBySingers(@RequestParam("ids") List<Long> ids) {
        List<Song> songs=songService.findBySingerId(ids);
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find-by-author-ids")
    public ResponseEntity<?> findByAuthors(@RequestParam("ids") List<Long> ids) {
        List<Song> songs=songService.findByAuthorId(ids);
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find-by-category-ids")
    public ResponseEntity<?> findByCategories(@RequestParam("ids") List<Long> ids) {
        List<Song> songs=songService.findByCategoriesId(ids);
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Song songs=songService.findById(id);
        return ResponseEntity.ok(new SongResponse(songs));

    }

    @GetMapping("/find-by-name")
    public ResponseEntity<?> findByName( @RequestParam("name") String name) {
        List<Song> songs=songService.findByNameLike(name);
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find-top-popular-by-singer")
    public ResponseEntity<?> findTopByListenCountAndSingers(@RequestParam("id") Long singerId){
        List<Song> songs=songService.findTopByListenCountAndSingers(PageRequest.of(0,4),singerId);
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
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

    @GetMapping("/count/get-listen-count")
    public ResponseEntity<?> getListenCount(@RequestParam("songId") Long id){
        Song song = songService.findById(id);
        if (song==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(song.getListenCount());
    }
    @GetMapping("/find-trending")
    public ResponseEntity<?> getSongTrending(){
    return ResponseEntity.ok(songService.getSongTrending());
    }

    @GetMapping("/find-trending-jpa")
    public ResponseEntity<?> getSongTrendingJpa(){
        List<Song> songs=songService.getSongTrending(PageRequest.of(0,9));
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find-newest")
    public ResponseEntity<?> getSongNewest(){
        return ResponseEntity.ok(songService.getNewestSong());
    }

    @GetMapping("/find-newest-jpa")
    public ResponseEntity<?> getSongNewestJpa(){
        List<Song> songs=songService.getSongNewestJpa(PageRequest.of(0,8));
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);

    }

    @GetMapping("/find-lovest-jpa")
    public ResponseEntity<?> getTopFiveSongLovestJpa(){
        List<Song> songs=songService.findTopByLikeCount(PageRequest.of(0,5));
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);
    }
    @GetMapping("/find-charts")
    public ResponseEntity<?> getChartSongs(){
        return ResponseEntity.ok(songService.getChartSongs());
    }

    @GetMapping("/find-charts-jpa")
    public ResponseEntity<?> getChartSongs(@Nullable @RequestParam("id") String categoryId){



        if (categoryId==null){
            List<Song> songs=songService.getChartAll(PageRequest.of(0,10));
            ArrayList<SongResponse> response= new ArrayList<>();
            songs.stream().forEach(song->{
                response.add(new SongResponse(song));
            });
            return ResponseEntity.ok(response);
        }
        List<Song> songs=songService.getChartSongs(categoryId,PageRequest.of(0,10));
        ArrayList<SongResponse> response= new ArrayList<>();
        songs.stream().forEach(song->{
            response.add(new SongResponse(song));
        });
        return ResponseEntity.ok(response);

    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        sdf.setLenient(true);
        binder.registerCustomEditor(java.sql.Date.class, new CustomDateEditor(sdf, true));
    }

}


