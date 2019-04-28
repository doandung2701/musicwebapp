package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.Author;
import com.hust.musicapp.musicapp.payload.ArtistPayload;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuthorRepo extends JpaRepository<Author,Long> {

    @Query("select a from Author a where a.authorName like %:name%")
    List<Author> findByAuthorNameLike(@Param("name") String authorName);
    @Query(nativeQuery = true,
    value = "select a.author_id,a.author_name,a.brief_description,a.author_thumbnail,count(s.song_id) as num_song from author a left outer join author_song s on a.author_id=s.author_id group by a.author_id order by :orderParam",
            countQuery = "select count(*) from author"
    )
    Page<ArtistPayload> getArtists(Pageable pageable,@Param("orderParam")String orderParam);
    @Query(value = "select a.author_id,a.author_name,a.brief_description,a.author_thumbnail, count(s.song_id) as num_song from author a left outer join author_song s on a.author_id=s.author_id where a.author_name like %:name% group by a.author_id",nativeQuery = true)
    List<ArtistPayload> findByNameLike(@Param("name") String name);

}
