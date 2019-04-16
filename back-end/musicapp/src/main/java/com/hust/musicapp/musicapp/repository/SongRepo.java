package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.Song;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface SongRepo extends JpaRepository<Song,Long> {

    @Query("select s from Song s left outer join fetch s.user u where u.id=:id")
    List<Song> findByUserId(@Param("id") Long userId);

    @Query("select s from Song s where s.songName=:name")
    List<Song> findByNameExact(@Param("name") String name);

    @Query("select s from Song s where s.songName like %:name%")
    List<Song> findByNameLike(@Param("name") String name);

    @Query("select s from Song s left outer join fetch s.singers si where si.id in (:singerIds)")
    List<Song> findBySingerId(@Param("singerIds") List<Long> singerIds);

    @Query("select s from Song s left outer join fetch s.categories c where c.categoryId in (:categoryIds)")
    List<Song> findByCategoriesId(@Param("categoryIds") List<Long> categoryIds);

    @Query("select s from Song s left outer join fetch s.authors a where a.authorId in (:authorIds)")
    List<Song> findByAuthorId(@Param("authorIds") List<Long> authorIds);

}
