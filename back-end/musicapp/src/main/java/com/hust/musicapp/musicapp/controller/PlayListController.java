package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.FileStorageException;
import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.model.User;
import com.hust.musicapp.musicapp.payload.AddSongsToPlaylistReq;
import com.hust.musicapp.musicapp.payload.PlaylistPayload;
import com.hust.musicapp.musicapp.payload.SavePlaylistPayload;
import com.hust.musicapp.musicapp.repository.PlaylistRepo;
import com.hust.musicapp.musicapp.service.FileStorageService;
import com.hust.musicapp.musicapp.service.PlayListService;
import com.hust.musicapp.musicapp.service.SongService;
import com.hust.musicapp.musicapp.service.Userservice;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.aspectj.apache.bcel.util.Play;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/playlist")
@CrossOrigin("*")
public class PlayListController {

    @Autowired
    PlayListService playListService;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    SongService songService;

    @Autowired
    Userservice userservice;

    private List<PlaylistPayload> response(List<PlayList> paPlayLists) {
        return paPlayLists.stream().map(playList -> new PlaylistPayload(playList)).collect(Collectors.toList());
    }

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll() {
        List<PlayList> songs = playListService.findAll();

        return ResponseEntity.ok(response(songs));
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

        return ResponseEntity.ok(response(playListService.findAllPaging(pageable)));
    }

    @GetMapping("/find-by-user-id")
    public ResponseEntity<?> findByUserId(@RequestParam("id") Long id) {
        return ResponseEntity.ok(response(playListService.findByUserId(id)));
    }

    @GetMapping("/find-by-name/")
    public ResponseEntity<?> findByName(@RequestParam("name") String name) {
        return ResponseEntity.ok(response(playListService.findByName(name)));
    }

    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(new PlaylistPayload(playListService.findById(id)));
    }

    @PostMapping("/save-playlist")
    public ResponseEntity<?> addPlaylist(@RequestBody PlaylistPayload playlist) {
        return ResponseEntity.ok(playListService.save(new PlayList(playlist)));
    }

    @PostMapping("/save-playlist-user")
    public ResponseEntity<?> addPlaylistUser(@RequestParam(name="userId") Long userId,
                                         @RequestParam(name = "description") String description,
                                         @RequestParam(name = "name") String name,
                                         @RequestParam(name = "thumbnail") MultipartFile thumbnail) {
        String fileName = "";
        try {
            fileName = fileStorageService.storeFile(thumbnail);

        } catch (FileStorageException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
                .path(fileName).toUriString();
        PlayList p = new PlayList();
        p.setThumbnail(fileUri);
        p.setName(name);
        p.setDescription(description);
        p.setCreatedDate(new Date(System.currentTimeMillis()));
        p.setUser(userservice.findById(userId).get());
        return ResponseEntity.ok(playListService.save(p));
    }

    @PutMapping("/save-playlist-user")
    public ResponseEntity<?> savePlaylist(@RequestParam(name="userId") Long userId,
                                         @RequestParam(name = "playlistId") Long playlistId,
                                         @RequestParam(name = "description") String description,
                                         @RequestParam(name = "name") String name,
                                          @Nullable  @RequestParam(name = "thumbnail") MultipartFile thumbnail) {
        String fileName = "";
        PlayList p = playListService.findById(playlistId);
        User u = p.getUser();
        if (u.getId()!=userId){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You do not have the right to modify this playlist");
        }
        try {
            if (thumbnail!=null) {
                fileName = fileStorageService.storeFile(thumbnail);
                String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
                        .path(fileName).toUriString();
                p.setThumbnail(fileUri);
            }

        } catch (FileStorageException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        p.setName(name);
        p.setDescription(description);
        return ResponseEntity.ok(playListService.save(p));
    }

    @PutMapping("/save-playlist")
    public ResponseEntity<?> updatePlaylist(@RequestBody PlaylistPayload playlist) {
        return ResponseEntity.ok(playListService.save(new PlayList(playlist)));
    }


    @DeleteMapping("/delete-playlist")
    public ResponseEntity<?> deletePlaylist(@RequestParam("id") Long id) {
        PlayList p = playListService.findById(id);
        if (p != null) {
            playListService.delete(p);
            return ResponseEntity.ok(p.getId());
        } else return ResponseEntity.notFound().build();
    }

    @PutMapping("/add-songs")
    public ResponseEntity<?> addSongs(@RequestBody AddSongsToPlaylistReq req){
        List<PlayList> playLists = playListService.findDistinctByIdIn(req.getPlaylistIds());
        List<Song> songs = songService.findDistinctBySongIdIn(req.getSongId());
        for (PlayList playList: playLists){
            Set<Song> songs1 = playList.getSongs();
            songs1.addAll(songs);
            playList.setSongs(songs1);
        }
        return ResponseEntity.ok(playListService.saveAll(playLists));
    }

    @PutMapping("/remove-songs")
    public ResponseEntity<?> removeSongs(@RequestBody AddSongsToPlaylistReq req){
        PlayList playList = playListService.findById(req.getPlaylistIds().get(0));
        List<Song> songs = songService.findDistinctBySongIdIn(req.getSongId());
        playList.getSongs().removeAll(songs);
        return ResponseEntity.ok(playListService.save(playList));
    }
}
