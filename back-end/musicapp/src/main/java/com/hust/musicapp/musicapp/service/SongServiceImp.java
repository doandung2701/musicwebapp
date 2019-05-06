package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Category;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;
import com.hust.musicapp.musicapp.payload.SongPayload;
import com.hust.musicapp.musicapp.payload.TrendingSong;
import com.hust.musicapp.musicapp.repository.SongRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Repository
@Service
@Transactional
public class SongServiceImp implements SongService {

    @Autowired
    private SongRepo songRepo;

    @Override
    public List<TrendingSong> getSongTrending() {
        return songRepo.getSongTrending();
    }

    @Override
    public List<TrendingSong> getNewestSong() {
        return songRepo.getSongNewest();
    }

    @Override
    public List<TrendingSong> getTopgFiveSongLovest() {
        return songRepo.getTopSongLovest();
    }

    @Override
    public List<Song> select4RandomByCategory(Long categoryId) {
        return songRepo.select4RandomByCategory(categoryId);
    }

    @Override
    public ArrayList<Song> getSongTrending(Pageable pageable) {
        return songRepo.getSongTrending(pageable);
    }

    @Override
    public ArrayList<Song> getSongNewestJpa(Pageable pageable) {
        return songRepo.getSongNewestJpa(pageable);
    }

    @Override
    public List<TrendingSong> getChartSongs() {
        return songRepo.getChartSongs();
    }

    @Override
    public List<Song> findDistinctByCategoriesIn(List<String> categories) {
        return songRepo.findDistinctByCategoriesIn(categories);
    }

    @Override
    public List<Song> findDistinctByAlbumId(Long id,Pageable pageable) {
        return songRepo.findDistinctByAlbumId(id,pageable);
    }

    @Override
    public List<Song> getChartSongs(String id,Pageable pageable) {
        return songRepo.getChartSongs(id,pageable);
    }

    @Override
    public List<Song> getChartAll(Pageable pageable) {
        return songRepo.getChartAll(pageable);
    }

    @Override
    public List<Song> findTopByLikeCount(Pageable pageable){
        return songRepo.findTopByLikeCount(pageable);
    }
    @Override
    public List<Song> findAll() {
        List<Song> songs = new ArrayList<>();
        songRepo.findAll().forEach(song->{
            songs.add(song);
        });
        return songs;
    }

    @Override
    public List<Song> findAllWithPaging(Pageable pageable) {
        return songRepo.findAll(pageable).getContent();
    }

    @Override
    public Song findById(Long id) {
        return songRepo.findById(id).get();
    }

    @Override
    public List<Song> findDistinctByPlayListsId(Long id, Pageable pageable) {
        return songRepo.findDistinctByPlayListsId(id,pageable);
    }

    @Override
    public List<Song> findByUserId(Long id,Pageable pageable) {
        return songRepo.findByUserId(id,pageable);
    }

    @Override
    public List<Song> findLikeSongsByUserId(Long userId, Pageable pageable) {
        return songRepo.findLikeSongByUserId(userId,pageable);
    }

    @Override
    public List<Song> findByNameExact(String name) {
        return songRepo.findByNameExact(name);
    }

//    @Override
//    public List<SongPayload> findByNameLike(String name) {
//        return songRepo.findByNameLike(name);
//    }

    @Override
    public List<Song> findByNameLike(String name) {
        return songRepo.findByNameLike(name);
    }

    @Override
    public List<Song> findBySingerId(List<Long> singerIds) {
        return songRepo.findBySingerId(singerIds);
    }

    @Override
    public List<Song> findByCategoriesId(List<String> categoryIds) {
        return songRepo.findByCategoriesId(categoryIds);
    }

    @Override
    public List<Song> findByAuthorId(List<Long> authorIds) {
        return songRepo.findByAuthorId(authorIds);
    }

    public Long count(){
        return songRepo.count();
    }

    @Override
    public Long countDistinctBySingers(Singer s) {
        return songRepo.countDistinctBySingers(s);
    }

    @Override
    public List<Song> findTopByListenCountAndSingers(Pageable pageable, Long singerId) {
        return songRepo.findTopByListenCountAndSingers(pageable,singerId);
    }

    @Override
    public List<Song> findDistinctBySingers(Long singerId, Pageable pageable) {
        return songRepo.findDistinctBySingers(singerId,pageable);
    }

    @Override
    public Song save(Song song) {
        return songRepo.save(song);
    }

    @Override
    public Song getOne(Long id){
        return songRepo.getOne(id);
    }

    @Override
    public List<Song> saveAll(List<Song> songs) {
        return songRepo.saveAll(songs);
    }

    @Override
    public void deleteSong(Song song) {
        songRepo.delete(song);
    }
}
