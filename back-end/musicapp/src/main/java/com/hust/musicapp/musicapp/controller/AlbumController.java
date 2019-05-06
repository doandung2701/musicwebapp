package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.FileStorageException;
import com.hust.musicapp.musicapp.exception.ResourceNotFoundException;
import com.hust.musicapp.musicapp.model.Album;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.payload.AlbumPayload;
import com.hust.musicapp.musicapp.service.*;
import com.hust.musicapp.musicapp.payload.AlbumResponse;
import com.hust.musicapp.musicapp.service.AlbumService;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/albums")
public class AlbumController {

    Logger logger= LoggerFactory.getLogger(AlbumController.class);
    @Autowired
    private AlbumService albumService;
    @Autowired
    private SongService songService;
    @Autowired
    private SingerService singerService;
    @Autowired
    private FileStorageService fileStorageService;
    @GetMapping("/find-all")
    public ResponseEntity<?> findAll() {
        List<Album> albums = albumService.findAll();
        return ResponseEntity.ok(albums);
    }

    @GetMapping("/count/count-all")
    public ResponseEntity<Long> countAll() {
        return ResponseEntity.ok(albumService.count());
    }

    @GetMapping("/find-paging")
    public ResponseEntity<?> findPaging(@RequestParam("page") Integer page,
                                        @RequestParam("rows") Integer rows,
                                        @Nullable @RequestParam("orderBy") String order,
                                        @Nullable @RequestParam("direction") String direction) {

        Pageable pageable = PageableUtil.getPageable(page, rows, order, direction);
        return ResponseEntity.ok(albumService.findAllWithPaging(pageable));
    }
 @GetMapping("dung/find-by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(new AlbumPayload(albumService.findById(id)));
    }
    @GetMapping("dung/find-by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(new AlbumResponse(albumService.findById(id)));
    }

    @GetMapping("/find-by-name")
    public ResponseEntity<?> findByName( @RequestParam("name") String name) {
        return ResponseEntity.ok(albumService.findByNameLike(name));
    }

    @PostMapping("/save-albums")
    public ResponseEntity<?> addAlbum(@RequestBody AlbumPayload albums) {
        Album album=new Album();
        album.setAlbumName(albums.getAlbumName());
        album.setSinger(albums.getSinger());
        album.setCreatedDate(new Date());
        Album response=albumService.save(album);
        List<Song> songs=new ArrayList<>(albums.getSongs());
        for (int i = 0; i < songs.size(); i++) {
            Song songData=songService.findById(songs.get(i).getSongId());
            songData.setAlbum(response);
            songService.save(songData);

        }
        return ResponseEntity.ok(response);
    }
    @PutMapping("{id}/update-thumbnail")
    public ResponseEntity<?> updateThumbnail(@RequestParam("file") MultipartFile file, @PathVariable("id")Long id){
        String fileName = "";

        try {
            fileName = fileStorageService.storeFile(file);

        } catch (FileStorageException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
                .path(fileName).toUriString();
        Album album=albumService.findById(id);
        album.setThumbnail(fileUri);

        return ResponseEntity.ok( albumService.save(album));
    }
    @PutMapping("/save-albums")
    public ResponseEntity<?> updateAlbum(@RequestBody AlbumPayload album){
        Album albumData=albumService.findById(album.getId());
        albumData.setAlbumName(album.getAlbumName());
        albumData.setSinger(album.getSinger());
        albumService.save(albumData);

        List<Song> songs=new ArrayList<>(album.getSongs());
        for (int i = 0; i < songs.size(); i++) {
            Song songData=songService.findById(songs.get(i).getSongId());
            songData.setAlbum(albumData);
            songService.save(songData);

        }


        return ResponseEntity.ok(albumService.findById(album.getId()));
    }
    @DeleteMapping("/delete-album")
    public ResponseEntity<?> deleteAlbum(@RequestParam("id") Long id) {
        Album s = albumService.findById(id);
        if (s!=null) {
            s.getSongs().forEach(song -> {
                song.setAlbum(null);
                songService.save(song);
            });
            s.setSinger(null);
            albumService.deleteAlbum(s);
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
    @PutMapping("/{albumId}/{songId}")
    public ResponseEntity uploadAlbum(@PathVariable("albumId")Long albumId,@PathVariable("songId") Long songId) throws Exception{
        Song song=songService.findById(songId);
        if(song==null){
            return ResponseEntity.badRequest().body("Song not found");
        }
        Album album=albumService.findById(albumId);
        if(album==null){
            return ResponseEntity.badRequest().body("Album not found");
        }
        Song searchSong=album.getSongs().stream().filter(s->s.getSongId()==song.getSongId()).findFirst().get();
        if(searchSong!=null){
            return ResponseEntity.ok().body("Song already existed in Album");
        }
        album.getSongs().add(song);
        albumService.save(album);
        return ResponseEntity.ok().body(song);
    }
    @PutMapping("/{albumId}")
    public ResponseEntity uploadNewSongToAlbum(@RequestParam("file") MultipartFile file,
                                               @PathVariable("albumId") Long albumId,
                                               @RequestBody Song song
                                               ) throws Exception{
        Album album=albumService.findById(albumId);
        if(album==null)
            throw new ResourceNotFoundException("Album not found","id",albumId);
        if(song.getSongId()!=null){
            return ResponseEntity.badRequest().body("Song already existed");
        }
        Song songStored=songService.save(song);
        String fileName = "";
        try {
            fileName = fileStorageService.storeFile(file);

        } catch (FileStorageException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
                .path(fileName).toUriString();
        songStored.setSongSrc(fileUri);
        songService.save(song);
        albumService.save(album);
        return ResponseEntity.ok(song);
    }

    @GetMapping("/find-by-singer-id")
    public ResponseEntity<?> findBySingerId(@RequestParam("singerId") Long singerId){
        return ResponseEntity.ok(albumService.findDistinctBySingerId(singerId));
    }
}
