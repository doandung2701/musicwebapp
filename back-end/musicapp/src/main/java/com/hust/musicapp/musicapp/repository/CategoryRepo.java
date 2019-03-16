package com.hust.musicapp.musicapp.repository;

import com.hust.musicapp.musicapp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category,String> {

    @Query("select c from Category c where c.categoryName like %:name%")
    List<Category> findByNameLike(@Param("name") String name);
}

