package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.ResourceNotFoundException;
import com.hust.musicapp.musicapp.model.User;
import com.hust.musicapp.musicapp.repository.UserRepository;
import com.hust.musicapp.musicapp.security.CurrentUser;
import com.hust.musicapp.musicapp.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @CrossOrigin("https://localhost:3000")
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
