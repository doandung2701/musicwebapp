package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.model.Author;
import com.hust.musicapp.musicapp.service.AuthorService;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("authorsController")
@RequestMapping("/authors")
@CrossOrigin("*")
public class AuthorController {

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

}
