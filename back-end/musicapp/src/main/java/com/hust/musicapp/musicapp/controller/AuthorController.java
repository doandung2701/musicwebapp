package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.exception.FileStorageException;
import com.hust.musicapp.musicapp.model.Author;
import com.hust.musicapp.musicapp.service.AuthorService;
import com.hust.musicapp.musicapp.service.FileStorageService;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController("authorsController")
@RequestMapping("/authors")
@CrossOrigin("*")
public class AuthorController {

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    private AuthorService authorService;

    @GetMapping("/find-by-name-like")
    public ResponseEntity<?> findByNameLike( @RequestParam("name") String name) {
        return ResponseEntity.ok(authorService.findByNameLike(name));
    }
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
    @GetMapping("/find-paging")
    public ResponseEntity<?> findPaging(@RequestParam("page") Integer page,
                                        @RequestParam("rows") Integer rows,
                                        @Nullable @RequestParam("orderBy") String order,
                                        @Nullable @RequestParam("direction") String direction) {

        Pageable pageable = PageableUtil.getPageable(page, rows, order, direction);
        return ResponseEntity.ok(authorService.findAllWithPaging(pageable));
    }
    @GetMapping("/find-by-pageable")
    public ResponseEntity<?> findByPageable(@RequestParam String orderParam,Pageable pageable){
        return ResponseEntity.ok(authorService.getArtitst(pageable,orderParam));
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

    @DeleteMapping("/delete-author-admin")
    public ResponseEntity<?> deleteAuthorAdmin(@RequestParam("id") Long id) {
        Author p = authorService.findById(id);
        if (p != null) {
            authorService.deleteAuthor(p);
            return ResponseEntity.ok(p.getAuthorId());
        } else return ResponseEntity.notFound().build();
    }

    @PostMapping("/save-author-thumbnail")
    public ResponseEntity<?> addAuthorThumbail(@RequestParam("file") MultipartFile file) {
        System.out.println(file);
        String fileName = "";
        try {
            fileName = fileStorageService.storeFile(file);

        } catch (FileStorageException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
                .path(fileName).toUriString();
        return ResponseEntity.ok(fileUri);
    }
}
