package com.hust.musicapp.musicapp.controller;
import com.hust.musicapp.musicapp.model.RadioChanel;
import com.hust.musicapp.musicapp.repository.RadioChannelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/radios")
@CrossOrigin("*")
public class RadioChanelController {

    @Autowired
    RadioChannelRepo radioChannelRepo;

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(radioChannelRepo.findAll());
    }
    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id){
        Optional<RadioChanel> data=radioChannelRepo.findById(id);
        if(data.isPresent()){
            return ResponseEntity.ok(data.get());
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/create-radio-channel")
    public ResponseEntity<?> createRadioChannel(@RequestBody RadioChanel request){
        if(request.getSongId()==null){
            RadioChanel response=radioChannelRepo.save(request);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body("RedioChannel cant have id");

    }

    @PutMapping("/update-radio-channel")
    public ResponseEntity<?> updateRadioChannel(@RequestBody RadioChanel request){
        if(request.getSongId()!=null){
            RadioChanel response=radioChannelRepo.save(request);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body("RedioChannel id cant not null");

    }
    @DeleteMapping("/delete-radio-channel/{id}")
    public ResponseEntity<?> deleteRadioChannel(@PathVariable("id") Long id){
        Optional<RadioChanel> radioChanel=radioChannelRepo.findById(id);
        if(radioChanel.isPresent()){
            radioChannelRepo.delete(radioChanel.get());
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}