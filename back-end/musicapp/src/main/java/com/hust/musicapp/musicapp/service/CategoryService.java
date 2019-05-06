package com.hust.musicapp.musicapp.service;

import com.hust.musicapp.musicapp.model.Category;

import java.util.List;
import java.util.Set;

public interface CategoryService {

    Category findById(String id);

    List<Category> findByName(String name);

    Category save(Category category);

    List<Category> saveAll(List<Category> categories);

    List<Category> findAll();

    Set<Category> findDistinctByCategoryIdIn(List<String> categoryIds);

    Long count();

    void delete(Category c);

}
