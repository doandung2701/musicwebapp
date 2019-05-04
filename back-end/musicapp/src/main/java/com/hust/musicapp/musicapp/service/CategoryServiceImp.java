package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Category;
import com.hust.musicapp.musicapp.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Service
@Transactional
public class CategoryServiceImp implements CategoryService {

    @Autowired
    CategoryRepo categoryRepo;

    @Override
    public Category findById(String id) {
        return categoryRepo.findById(id).get();
    }

    @Override
    public List<Category> findByName(String name) {
        return categoryRepo.findByNameLike(name);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepo.findAll();
    }

    @Override
    public Category save(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public List<Category> saveAll(List<Category> categories) {
        return categoryRepo.saveAll(categories);
    }

    @Override
    public Long count() {
        return categoryRepo.count();
    }

    @Override
    public void delete(Category c) {
        categoryRepo.delete(c);
    }
}
