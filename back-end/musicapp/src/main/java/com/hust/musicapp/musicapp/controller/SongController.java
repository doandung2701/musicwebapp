package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.FileStorageException;
import com.hust.musicapp.musicapp.exception.ResourceNotFoundException;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.model.User;
import com.hust.musicapp.musicapp.service.FileStorageService;
import com.hust.musicapp.musicapp.service.SongService;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;
import org.springframework.core.io.Resource;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/songs")//all request starting with /songs goes here
@CrossOrigin("*")//enable cross origin resources sharing
public class SongController {
    Logger logger= LoggerFactory.getLogger(SongController.class);
    @Autowired
    private SongService songService;
    @Autowired
    private FileStorageService fileStorageService;
    @GetMapping("/find-all")
    public ResponseEntity<?> findAll() {
        List<Song> songs = songService.findAll();
        return ResponseEntity.ok(songs);
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
    @GetMapping("/find-newest")
    public ResponseEntity<?> getSongNewest(){
        return ResponseEntity.ok(songService.getNewestSong());
    }
    @GetMapping("/find-lovest")
    public ResponseEntity<?> getTopFiveSongLovest(){
        return ResponseEntity.ok(songService.getTopgFiveSongLovest());
    }
    @GetMapping("/find-charts")
    public ResponseEntity<?> getChartSongs(){
        return ResponseEntity.ok(songService.getChartSongs());
    }
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        sdf.setLenient(true);
        binder.registerCustomEditor(java.sql.Date.class, new CustomDateEditor(sdf, true));
    }
    @PutMapping("/{id}/upload-song")
    public ResponseEntity uploadSong(@RequestParam("file") MultipartFile file, @PathVariable("id")Long id) throws Exception{
        String fileName = "";
        try {
            fileName = fileStorageService.storeFile(file);

        } catch (FileStorageException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
                .path(fileName).toUriString();
       Song song=songService.findById(id);
       song.setSongSrc(fileUri);
       songService.save(song);
        return ResponseEntity.ok(fileUri);
    }
    @PutMapping("/{id}/upload-image-song")
    public ResponseEntity uploadThumbnail(@RequestParam("file") MultipartFile file,@PathVariable("id") Long id) throws Exception{
        String fileName = "";
        try {
            fileName = fileStorageService.storeFile(file);

        } catch (FileStorageException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
                .path(fileName).toUriString();
        Song song=songService.findById(id);
        song.setThumbnail(fileUri);
        songService.save(song);
        return ResponseEntity.ok(fileUri);
    }
    @GetMapping("downloadSong/{fileName:.+}")
    public ResponseEntity<Resource> downloadSong(@PathVariable String fileName, HttpServletRequest request){
        Resource resource=fileStorageService.loadFileAsResource(fileName);
        String contentType=null;
        try {
            contentType=request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        }catch (IOException e){
            logger.info("Could not determine file type.");

        }
        if (contentType==null){
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}


