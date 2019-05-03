package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Category;

import java.util.List;

public interface CategoryService {

    Category findById(String id);

    List<Category> findByName(String name);

    Category save(Category category);

    List<Category> saveAll(List<Category> categories);

    List<Category> findAll();

    Long count();

    void delete(Category c);

}
