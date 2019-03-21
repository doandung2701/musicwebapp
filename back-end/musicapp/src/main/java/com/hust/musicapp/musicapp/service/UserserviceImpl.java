package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.exception.ResourceNotFoundException;
import com.hust.musicapp.musicapp.model.PlayList;
import com.hust.musicapp.musicapp.model.User;
import com.hust.musicapp.musicapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserserviceImpl implements Userservice{


    @Autowired
    UserRepository userRepository;

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);

    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> findAllWithPaging(Pageable pageable) {
        return userRepository.findAll(pageable).getContent();
    }

    @Override
    public List<User> findByEmailExact(String email) {
        return userRepository.findByEmailExact(email);
    }

    @Override
    public List<User> findByEmailLike(String email) {
        return userRepository.findByEmailLike(email);
    }

    @Override
    public Long count() {
        return userRepository.count();
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public void toggleActiveUser(Boolean active, Long id) {
        userRepository.toggleActiveUser(active,id);
    }

    @Override
    public List<PlayList> getPlaylistsOfUser(Long id) {
        return userRepository.getPlaylistsOfUser(id);
    }
}
