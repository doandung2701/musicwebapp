package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.FileStorageException;
import com.hust.musicapp.musicapp.exception.ResourceNotFoundException;
import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.model.User;
import com.hust.musicapp.musicapp.security.CurrentUser;
import com.hust.musicapp.musicapp.security.UserPrincipal;
import com.hust.musicapp.musicapp.service.SongService;
import com.hust.musicapp.musicapp.service.FileStorageService;
import com.hust.musicapp.musicapp.service.Userservice;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class UserController {
    public static final String RESOURCE_NAME = "USER";
    public static final String RESOURCE_ID = "USER_ID";
    public static final int ACTIVE_CODE = 0;

    @Autowired
    private Userservice userservice;

    @Autowired
    private SongService songService;
    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        Optional<User> user = userservice.findById(userPrincipal.getId());
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new ResourceNotFoundException(RESOURCE_NAME, RESOURCE_ID, userPrincipal.getId());

        }
    }

    @GetMapping(value = "/users/fill-all")
    public List<User> getAll() {
        return userservice.findAll();
    }

    @GetMapping(value = "/users/find-paging")
    public ResponseEntity<?> findPaging(@RequestParam("page") Integer page,
                                        @RequestParam("rows") Integer row,
                                        @Nullable @RequestParam("orderBy") String order,
                                        @Nullable @RequestParam("direction") String direction) {
        Pageable pageable = PageableUtil.getPageable(page, row, order, direction);
        return ResponseEntity.ok(userservice.findAllWithPaging(pageable));
    }

    @GetMapping("/users/find-by-id/{id}")
    public User getUserById(@PathVariable long id) {
        Optional<User> user = userservice.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new ResourceNotFoundException(RESOURCE_NAME, RESOURCE_ID, id);
        }
    }

    @PutMapping("/users/toggle-active/{id}")
    @Transactional
    public ResponseEntity toggleActiveUser(@PathVariable long id, @RequestParam(required = true) int active) {
        Boolean actived = (active == ACTIVE_CODE) ? false : true;
        userservice.toggleActiveUser(actived, id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("users/get-playlist-users/{id}/playlists")
    public List<PlayList> getPlaylistsOfUser(@PathVariable long id) {
        List<PlayList> playLists = userservice.getPlaylistsOfUser(id);
        if (playLists == null)
            throw
                    new ResourceNotFoundException(RESOURCE_NAME, "id", id);
        return playLists;
    }

    @PutMapping("/users/like-song")
    public ResponseEntity likeSongByUser(@RequestParam("userId") Long userId, @RequestParam("songId") Long songId) {
        User user = userservice.findById(userId).get();
        Song song = songService.findById(songId);
        user.getLikeSongs().add(song);
        userservice.save(user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{id}/upload-image")
    public ResponseEntity uploadImageProfile(@RequestParam("file") MultipartFile file, @PathVariable("id") Long id) throws
            Exception {
        String fileName = "";
        try {
            fileName = fileStorageService.storeFile(file);

        } catch (FileStorageException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
                .path(fileName).toUriString();
        User user = userservice.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found", "id", id));
        user.setImageUrl(fileUri);
        userservice.save(user);
        return ResponseEntity.ok(fileUri);
    }
}
