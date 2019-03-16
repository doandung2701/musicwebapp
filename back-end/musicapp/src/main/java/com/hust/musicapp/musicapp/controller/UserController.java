package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.ResourceNotFoundException;
import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.model.User;
import com.hust.musicapp.musicapp.repository.UserRepository;
import com.hust.musicapp.musicapp.security.CurrentUser;
import com.hust.musicapp.musicapp.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    public static final String RESOURCE_NAME="USER";
    public static final String RESOURCE_ID="USER_ID";
    public static final int ACTIVE_CODE=0;
    public static final int DISACTIVE_CODE=1;
    @Autowired
    private UserRepository userRepository;
    @CrossOrigin("https://localhost:3000")
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
    @GetMapping(value = {"/users","/users/"})
    public List<User> getAll(){
        return userRepository.findAll();
    }
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable long id){
        Optional<User> user=userRepository.findById(id);
        if(user.isPresent()){
            return user.get();
        }else{
            throw new ResourceNotFoundException(RESOURCE_NAME,RESOURCE_ID,id);
        }
    }
    @PutMapping("/users/{id}")
    @Transactional
    public ResponseEntity toggleActiveUser(@PathVariable long id, @RequestParam(required = true) int active){
        Boolean actived=(active==ACTIVE_CODE)?false:true;
        userRepository.toggleActiveUser(actived,id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    @GetMapping("users/{id}/playlists")
    public List<PlayList> getPlaylistsOfUser(@PathVariable long id){
        List<PlayList> playLists=userRepository.getPlaylistsOfUser(id);
        if(playLists==null)
            throw
         new   ResourceNotFoundException(RESOURCE_NAME,"id",id);
        return playLists;
    }

}
