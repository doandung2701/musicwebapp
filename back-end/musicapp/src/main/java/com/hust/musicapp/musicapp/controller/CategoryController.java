package com.hust.musicapp.musicapp.controller;

import com.hust.musicapp.musicapp.model.Category;
import com.hust.musicapp.musicapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(categoryService.findAll());
    }


    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<?> findById(@PathVariable String id){
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @GetMapping("/find-by-name/{name}")
    public ResponseEntity<?> findByName(@PathVariable String name){
        return ResponseEntity.ok(categoryService.findByName(name));
    }

    @PostMapping("/save-categories")
    public ResponseEntity<?> addCategories(@RequestBody List<Category> categories){
        return ResponseEntity.ok(categoryService.saveAll(categories));
    }

    @PutMapping("/save-categories")
    public ResponseEntity<?> updateCategories(@RequestBody List<Category> categories){
        return ResponseEntity.ok(categoryService.saveAll(categories));
    }

    @GetMapping("/count/count-all")
    public ResponseEntity<Long> count(){
        return ResponseEntity.ok(categoryService.count());
    }

    @DeleteMapping("/delete-category")
    public ResponseEntity<?> deleteCategory(@RequestBody Category category){
        Category a = categoryService.findById(category.getCategoryId());
        categoryService.delete(a);
        return ResponseEntity.ok("Delete successfully");
    }

}
