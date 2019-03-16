package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Comment;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentService {

    Comment findById(Long id);

    List<Comment> findByParentId(Long id);

    List<Comment> findByUserId(Long id);

    List<Comment> findBySongId(Long id);

    Comment save(Comment comment);

    Long count();

    void delete(Comment c);

    List<Comment> findAll();

    List<Comment> findAllPaging(Pageable pageable);

}
