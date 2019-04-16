package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.model.Author;
import com.hust.musicapp.musicapp.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("authorsController")
@RequestMapping("/authors")
@CrossOrigin("*")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(authorService.findAll());
    }

    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return ResponseEntity.ok(authorService.findById(id));
    }

    @GetMapping("/find-by-name/{name}")
    public ResponseEntity<?> findByName(@PathVariable String name){
        return ResponseEntity.ok(authorService.findByName(name));
    }

    @PostMapping("/save-authors")
    public ResponseEntity<?> addAuthors(@RequestBody List<Author> authors){
        return ResponseEntity.ok(authorService.saveAll(authors));
    }

    @PutMapping("/save-authors")
    public ResponseEntity<?> updateAuthors(@RequestBody List<Author> authors){
        return ResponseEntity.ok(authorService.saveAll(authors));
    }


    @GetMapping("/count/count-all")
    public ResponseEntity<Long> count(){
        return ResponseEntity.ok(authorService.count());
    }

    @DeleteMapping("/delete-author")
    public ResponseEntity<?> deleteAuthor(@RequestBody Author author){
        Author a = authorService.findById(author.getAuthorId());
        authorService.deleteAuthor(a);
        return ResponseEntity.ok("Delete successfully");
    }

}
