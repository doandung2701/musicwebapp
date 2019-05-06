package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Comment;
import com.hust.musicapp.musicapp.repository.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
@Repository
public class CommentServiceImp implements CommentService {

    @Autowired
    CommentRepo  commentRepo;

    @Override
    public Set<Comment> findDistinctByUserIdAndParentCmtIsNull(Long id) {
        return commentRepo.findDistinctByUserIdAndParentCmtIsNull(id);
    }

    @Override
    public Set<Comment> findDistinctBySongSongIdAndParentCmtIsNull(Long id) {
       return commentRepo.findDistinctBySongSongIdAndParentCmtIsNull(id);
    }

    @Override
    public List<Comment> findAll() {
        return commentRepo.findAll();
    }

    @Override
    public Comment findById(Long id) {
        return commentRepo.findById(id).get();
    }

    @Override
    public List<Comment> findByParentId(Long id) {
        return commentRepo.findByParentId(id);
    }

    @Override
    public Comment save(Comment comment) {
        return commentRepo.save(comment);
    }

    @Override
    public Long count() {
        return commentRepo.count();
    }

    @Override
    public void delete(Comment c) {
        commentRepo.delete(c);
    }

    @Override
    public List<Comment> findByUserId(Long id) {
        return commentRepo.findByUserId(id);
    }

    @Override
    public List<Comment> findBySongId(Long id) {
        return commentRepo.findBySongId(id);
    }

    @Override
    public List<Comment> findAllPaging(Pageable pageable) {
        return commentRepo.findAll(pageable).getContent();
    }
}
