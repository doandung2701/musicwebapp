package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comment,Long> {

    @Query("select c from Comment c left outer join fetch c.user u where u.id=:id")
    List<Comment> findByUserId(@Param("id") Long userId);

    @Query("select c from Comment c left join fetch c.parentCmt p where p.commentId=:id")
    List<Comment> findByParentId(@Param("id") Long id);

    @Query("select c from Comment c left outer join fetch c.song s where s.songId=:id")
    List<Comment> findBySongId(@Param("id") Long id);

}
