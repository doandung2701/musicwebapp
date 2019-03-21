package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("update User u set u.emailVerified=:actived where u.id = :id")
    @Modifying
    void toggleActiveUser(@Param("actived") Boolean active,@Param("id") Long id);

    @Query("select u.playLists from User u where u.id=:id")
    List<PlayList> getPlaylistsOfUser(@Param("id") Long id);
    @Query("select u from User u where u.email=:email")
    List<User> findByEmailExact(@Param("email") String email);
    @Query("select u from User u where u.email like %:email%")
    List<User> findByEmailLike(@Param("email")String email);
}
