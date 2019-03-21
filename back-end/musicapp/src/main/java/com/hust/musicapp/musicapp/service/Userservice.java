package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.model.User;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface Userservice {
    Optional<User> findById(Long id);
    List<User> findAll();
    List<User> findAllWithPaging(Pageable pageable);
    List<User> findByEmailExact(String email);
    List<User> findByEmailLike(String email);
    Long count();
    User save(User user);
    void deleteUser(User user);
    void toggleActiveUser(Boolean active,Long id);
    List<PlayList> getPlaylistsOfUser(Long id);
}
