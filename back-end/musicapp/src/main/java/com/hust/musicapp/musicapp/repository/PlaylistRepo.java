package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.PlayList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaylistRepo extends JpaRepository<PlayList,Long> {

    @Query("select p from PlayList p where p.name like %:name%")
    List<PlayList> findByName(@Param("name")String name);

    @Query("select p from PlayList p left outer join fetch p.user u where u.id=:id")
    List<PlayList> findByUserId(@Param("id")Long id);

}
