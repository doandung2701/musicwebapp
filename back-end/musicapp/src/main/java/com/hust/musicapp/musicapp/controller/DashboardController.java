package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.repository.SongRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("dashboard")
@CrossOrigin("*")
public class DashboardController {
    @Autowired
    SongRepo songRepo;
    @GetMapping
    public ResponseEntity detalDashboard(){
    return ResponseEntity.ok(songRepo.getDataDashboard());
    }
}
