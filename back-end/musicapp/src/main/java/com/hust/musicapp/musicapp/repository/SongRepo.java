package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.payload.SongPayload;
import com.hust.musicapp.musicapp.payload.TrendingSong;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface SongRepo extends JpaRepository<Song,Long> {

    @Query("select s from Song s left outer join fetch s.user u where u.id=:id")
    List<Song> findByUserId(@Param("id") Long userId);

    @Query("select s from Song s where s.songName=:name")
    List<Song> findByNameExact(@Param("name") String name);

    @Query(value = "select s.song_id, s.brief_description,s.song_name,s.song_src,s.thumbnail,s.upload_date,s.listen_count, s.checked from song s where s.song_name like %:name%",nativeQuery = true)
    List<SongPayload> findByNameLike(@Param("name") String name);

    @Query("select s from Song s left outer join fetch s.singers si where si.id in (:singerIds)")
    List<Song> findBySingerId(@Param("singerIds") List<Long> singerIds);

    @Query("select s from Song s left outer join fetch s.categories c where c.categoryId in (:categoryIds)")
    List<Song> findByCategoriesId(@Param("categoryIds") List<Long> categoryIds);

    @Query("select s from Song s left outer join fetch s.authors a where a.authorId in (:authorIds)")
    List<Song> findByAuthorId(@Param("authorIds") List<Long> authorIds);
    @Query(nativeQuery = true,value = "select s.song_id , s.brief_description, s.song_name,s.song_src,s.thumbnail, s.upload_date,s.listen_count,count(st.score_id) as rate_count,sum(st.score_value) as rate_value from song s left outer join rate r on s.song_id=r.song_id inner join score_type st on r.score_id=st.score_id group by song_id order by rate_count desc, rate_value desc limit 9")
    ArrayList<TrendingSong> getSongTrending();
    @Query(nativeQuery = true,value = "select s.song_id , s.brief_description, s.song_name,s.song_src,s.thumbnail, s.upload_date,s.listen_count,count(st.score_id) as rate_count,sum(st.score_value) as rate_value from song s left outer join rate r on s.song_id=r.song_id inner join score_type st on r.score_id=st.score_id group by song_id order by upload_date desc limit 8")
    ArrayList<TrendingSong> getSongNewest();
    @Query(nativeQuery = true,value = "select s.song_id , s.brief_description, s.song_name,s.song_src,s.thumbnail, s.upload_date,s.listen_count,count(st.score_id) as rate_count,sum(st.score_value) as rate_value from song s left outer join rate r on s.song_id=r.song_id inner join score_type st on r.score_id=st.score_id group by song_id order by rate_value desc limit 5")
    ArrayList<TrendingSong> getTopSongLovest();
    @Query(nativeQuery = true,value = "select s.song_id , s.brief_description, s.song_name,s.song_src,s.thumbnail, s.upload_date,s.listen_count,count(st.score_id) as rate_count,sum(st.score_value) as rate_value from song s left outer join rate r on s.song_id=r.song_id inner join score_type st on r.score_id=st.score_id group by song_id order by rate_value desc,rate_count desc limit 10")
    ArrayList<TrendingSong> getChartSongs();
}
