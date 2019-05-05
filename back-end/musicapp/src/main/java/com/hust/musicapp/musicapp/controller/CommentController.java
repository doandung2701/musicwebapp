package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.model.Comment;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.model.User;
import com.hust.musicapp.musicapp.payload.PostReplyRequest;
import com.hust.musicapp.musicapp.service.CommentService;
import com.hust.musicapp.musicapp.service.SongService;
import com.hust.musicapp.musicapp.service.Userservice;
import com.hust.musicapp.musicapp.util.PageableUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin("*")
public class CommentController {

    @Autowired
    CommentService commentService;

    @Autowired
    SongService songService;

    @Autowired
    Userservice userservice;

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

    @GetMapping("/find-comment-by-song-id")
    public ResponseEntity<?> findCommentBySongId(@RequestParam("songId") Long id) {
        return ResponseEntity.ok(commentService.findDistinctBySongSongIdAndParentCmtIsNull(id));
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

    @PostMapping("/save/post-comment")
    public ResponseEntity<?> saveComment( @RequestBody PostReplyRequest postReplyRequest) {
        Song song = songService.findById(postReplyRequest.getSongId());
        User u = userservice.findById(postReplyRequest.getUserId()).get();
        Comment comment = new Comment(postReplyRequest.getCmtCnt(), new Date(System.currentTimeMillis()), null, song,
                u);
        comment.setReplies(new HashSet<>());
        Comment comment1 = commentService.save(comment);
        if (comment1 == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can't save record");
        }
        return ResponseEntity.ok(commentService.findDistinctBySongSongIdAndParentCmtIsNull(postReplyRequest.getSongId()));
    }


    @PutMapping("/save-comment")
    public ResponseEntity<?> updateComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.save(comment));
    }

    @PostMapping("/save/post-reply")
    public ResponseEntity<?> saveReply( @RequestBody PostReplyRequest postReplyRequest) {
        Song song = songService.findById(postReplyRequest.getSongId());
        User u = userservice.findById(postReplyRequest.getUserId()).get();
        Comment parent = commentService.findById(postReplyRequest.getParentId());
        Comment reply = new Comment(postReplyRequest.getCmtCnt(), new Date(System.currentTimeMillis()), parent, song,
                u);
        Comment reply1 = commentService.save(reply);
        if (reply1 == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Can't save record");
        }
        return ResponseEntity.ok(commentService.findDistinctBySongSongIdAndParentCmtIsNull(postReplyRequest.getSongId()));
    }

    @DeleteMapping("/delete-comment")
    public ResponseEntity<?> deleteComment(@RequestParam("id") Long id ) {
        Comment c = commentService.findById(id);
        if (c!=null) {
            commentService.delete(c);
            return ResponseEntity.ok("Delete Sucessfully!");
        }
        else return  ResponseEntity.notFound().build();
    }

}
