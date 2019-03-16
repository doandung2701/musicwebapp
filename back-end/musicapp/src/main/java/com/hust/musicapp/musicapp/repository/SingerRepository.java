package com.hust.musicapp.musicapp.repository;
import com.hust.musicapp.musicapp.model.Singer;
import com.hust.musicapp.musicapp.model.Song;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SingerRepository extends PagingAndSortingRepository<Singer,Long> {
    @Query("select s.songs from Singer s where s.id=:id")
    List<Song> getAllSongsOfSinger(@Param("id")Long id);
}
