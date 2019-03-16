package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Author;
import com.hust.musicapp.musicapp.repository.AuthorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Repository
@Transactional
public class AuthorServiceImp implements AuthorService {

    @Autowired
    AuthorRepo authorRepo;

    @Override
    public Author findById(Long id) {
        return authorRepo.findById(id).get();
    }

    @Override
    public List<Author> findByName(String name) {
        return authorRepo.findByAuthorNameLike(name);
    }

    @Override
    public Author save(Author author) {
        return authorRepo.save(author);
    }

    @Override
    public List<Author> saveAll(List<Author> author) {
        return authorRepo.saveAll(author);
    }

    @Override
    public Long count(){
        return authorRepo.count();
    }

    @Override
    public void deleteAuthor(Author a){
        authorRepo.delete(a);
    }
}
