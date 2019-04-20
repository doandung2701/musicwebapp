package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.payload.SongPayload;
import com.hust.musicapp.musicapp.payload.TrendingSong;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SongService {

    List<Song> findAll();

    List<Song> findAllWithPaging(Pageable pageable);

    Song findById(Long id);

    List<Song> findByUserId(Long id);

    List<Song> findByNameExact(String name);

    List<SongPayload> findByNameLike(String name);

    List<Song> findBySingerId(List<Long> singerIds);

    List<Song> findByCategoriesId(List<Long> categoryIds);

    List<Song> findByAuthorId(List<Long> authorIds);

    Long count();

    Song save(Song song);

    Song getOne(Long id);

    List<Song> saveAll(List<Song> songs);
    List<TrendingSong> getSongTrending();
    List<TrendingSong> getNewestSong();
    List<TrendingSong> getTopgFiveSongLovest();
    List<TrendingSong> getChartSongs();
    void deleteSong(Song song);
}
