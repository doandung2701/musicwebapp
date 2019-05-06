package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.Category;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.payload.DasboardPayload;
import com.hust.musicapp.musicapp.payload.SongPayload;
import com.hust.musicapp.musicapp.payload.TrendingSong;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public interface SongRepo extends JpaRepository<Song, Long> {

    @Query("select s from Song s left outer join fetch s.user u where u.id=:id")
    List<Song> findByUserId(@Param("id") Long userId,Pageable pageable);

    @Query("select s from Song s where s.songName=:name")
    List<Song> findByNameExact(@Param("name") String name);

    @Query(nativeQuery = true,
            value = "select * from song inner join category_song on " +
                    "song.song_id=category_song.song_id where category_song.category_id=:id order by rand() limit 4")
    List<Song> select4RandomByCategory(@Param("id")Long categoryId);

//    @Query(value = "select s.song_id, s.brief_description,s.song_name,s.song_src,s.thumbnail,s.upload_date,s.listen_count, s.checked from song s where s.song_name like %:name%", nativeQuery = true)
//    List<SongPayload> findByNameLike(@Param("name") String name);

    Long countDistinctBySingers(Singer s);

    @Query(value = "select s from Song s where s.songName like %:name%")
    List<Song> findByNameLike(@Param("name") String name);

    @Query("select s from Song s left outer join fetch s.singers si where si.id=:id")
    List<Song> findDistinctBySingers(@Param("id") Long singerId,Pageable pageable);

    @Query("select s from Song s left outer join fetch s.singers si where si.id in (:singerIds)")
    List<Song> findBySingerId(@Param("singerIds") List<Long> singerIds);

    @Query("select s from Song s left outer join fetch s.categories c where c.categoryId in (:categoryIds)")
    List<Song> findByCategoriesId(@Param("categoryIds") List<String> categoryIds);

    @Query("select s from Song s left outer join fetch s.authors a where a.authorId in (:authorIds)")
    List<Song> findByAuthorId(@Param("authorIds") List<Long> authorIds);

    @Query("select s from Song s left outer join fetch s.singers si where si.id =:id order by s.listenCount desc ")
    List<Song> findTopByListenCountAndSingers(Pageable pageable,@Param("id")Long singerId);

    @Query("SELECT  s from Song s order by s.likeCount desc")
    List<Song> findTopByLikeCount(Pageable pageable);

    @Query(nativeQuery = true, value = "select s.song_id , s.brief_description, s.song_name,s.song_src,s.thumbnail, s.upload_date,s.listen_count,count(st.score_id) as rate_count,sum(st.score_value) as rate_value from song s left outer join rate r on s.song_id=r.song_id inner join score_type st on r.score_id=st.score_id group by song_id order by rate_count desc, rate_value desc limit 9")
    ArrayList<TrendingSong> getSongTrending();

    @Query("Select s from Song s order by s.likeCount desc ")
    ArrayList<Song> getSongTrending(Pageable pageable);

    @Query(nativeQuery = true, value = "select * from song order by upload_date desc limit 8")
    ArrayList<TrendingSong> getSongNewest();

    List<Song> findDistinctByAlbumId(Long id,Pageable pageable);

    @Query("select s from Song s left outer join fetch s.playLists p where p.id=:id")
    List<Song> findDistinctByPlayListsId(@Param("id") Long id,Pageable pageable);

    @Query(nativeQuery = true,
            value = "select * from song inner join category_song on " +
                    "song.song_id=category_song.song_id where category_song.category_id in (:categories) order by rand() limit 12")
    List<Song> findDistinctByCategoriesIn(List<String> categories);

    @Query(value = "select s from Song s order by upload_date desc")
    ArrayList<Song> getSongNewestJpa(Pageable pageable);

    @Query(nativeQuery = true, value = "select song_id , brief_description, song_name,song_src,thumbnail, upload_date,like_count,listen_count from song order by like_count desc limit 5")
    ArrayList<TrendingSong> getTopSongLovest();

    @Query(nativeQuery = true, value = "select s.song_id , s.brief_description, s.song_name,s.song_src,s.thumbnail, s.upload_date,s.listen_count,count(st.score_id) as rate_count,sum(st.score_value) as rate_value from song s left outer join rate r on s.song_id=r.song_id inner join score_type st on r.score_id=st.score_id group by song_id order by rate_value desc,rate_count desc limit 10")
    ArrayList<TrendingSong> getChartSongs();

    @Query("select s from Song s left outer join fetch s.categories c where c.categoryId=:id order by s.listenCount desc,s.likeCount desc ")
    ArrayList<Song> getChartSongs(@Param("id") String id,Pageable pageable);

    @Query("select s from Song s order by s.listenCount desc,s.likeCount desc ")
    List<Song> getChartAll(Pageable pageable);

    @Query(nativeQuery = true,value = "SELECT ( SELECT COUNT(*) FROM users ) AS NumOfUsers, ( SELECT COUNT(*) FROM song ) AS NumOfSongs, (SELECT COUNT(*) FROM comments ) AS NumOfComments, (SELECT COUNT(*) FROM singer ) AS NumOfSingers FROM dual")
    DasboardPayload getDataDashboard();
}
