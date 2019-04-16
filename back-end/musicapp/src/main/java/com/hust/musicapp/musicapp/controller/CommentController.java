package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.model.Comment;
import com.hust.musicapp.musicapp.service.CommentService;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin("*")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll() {
        List<Comment> songs = commentService.findAll();
        return ResponseEntity.ok(songs);
    }

    @GetMapping("/count/count-all")
    public ResponseEntity<Long> countAll() {
        return ResponseEntity.ok(commentService.count());
    }

    @GetMapping("/find-paging")
    public ResponseEntity<?> findPaging(@RequestParam("page") Integer page,
                                        @RequestParam("rows") Integer rows,
                                        @Nullable @RequestParam("orderBy") String order,
                                        @Nullable @RequestParam("direction") String direction) {

      Pageable pageable = PageableUtil.getPageable(page, rows, order, direction);
        return ResponseEntity.ok(commentService.findAllPaging(pageable));
    }

    @GetMapping("/find-by-song-id")
    public ResponseEntity<?> findBySongId(@RequestParam("id") Long id) {
        return ResponseEntity.ok(commentService.findBySongId(id));
    }


    @GetMapping("/find-by-user-id")
    public ResponseEntity<?> findByUserId(@RequestParam("id") Long id) {
        return ResponseEntity.ok(commentService.findByUserId(id));
    }

    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(commentService.findById(id));
    }

    @PostMapping("/save-comment")
    public ResponseEntity<?> addComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.save(comment));
    }

    @PutMapping("/save-comment")
    public ResponseEntity<?> updateComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.save(comment));
    }

    @DeleteMapping("/delete-comment")
    public ResponseEntity<?> deleteComment(@RequestBody Comment comment) {
        Comment c = commentService.findById(comment.getCommentId());
        if (c!=null) {
            commentService.delete(c);
            return ResponseEntity.ok("Delete Sucessfully!");
        }
        else return  ResponseEntity.notFound().build();
    }

}
