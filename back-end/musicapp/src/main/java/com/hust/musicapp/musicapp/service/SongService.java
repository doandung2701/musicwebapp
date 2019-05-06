package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Category;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.payload.SongPayload;
import com.hust.musicapp.musicapp.payload.TrendingSong;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public interface SongService {

    List<Song> findAll();

    List<Song> findAllWithPaging(Pageable pageable);

    Song findById(Long id);

    List<Song> findByUserId(Long id, Pageable pageable);

    List<Song> findByNameExact(String name);

//    List<SongPayload> findByNameLike(String name);

    Long countDistinctBySingers(Singer s);

    List<Song> findByNameLike(String name);

    List<Song> findBySingerId(List<Long> singerIds);

    List<Song> findByCategoriesId(List<String> categoryIds);

    List<Song> findByAuthorId(List<Long> authorIds);

    List<Song> select4RandomByCategory(Long categoryId);

    ArrayList<Song> getSongNewestJpa(Pageable pageable);

    List<Song> findTopByListenCountAndSingers(Pageable pageable, Long singerId);

    List<Song> findDistinctBySingers(Long singerId, Pageable pageable);

    Long count();

    Song save(Song song);

    Song getOne(Long id);

    List<Song> findTopByLikeCount(Pageable pageable);

    ArrayList<Song> getSongTrending(Pageable pageable);

    List<Song> saveAll(List<Song> songs);

    List<TrendingSong> getSongTrending();

    List<Song> findDistinctByCategoriesIn(List<String> categories);

    List<Song> findDistinctByAlbumId(Long id, Pageable pageable);

    List<Song> findDistinctByPlayListsId(Long id, Pageable pageable);

    List<TrendingSong> getNewestSong();

    List<TrendingSong> getTopgFiveSongLovest();

    List<TrendingSong> getChartSongs();

    List<Song> getChartSongs(String id, Pageable pageable);

    List<Song> getChartAll(Pageable pageable);

    void deleteSong(Song song);
}
