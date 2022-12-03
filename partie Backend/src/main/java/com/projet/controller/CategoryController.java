package com.projet.controller;

import com.projet.entity.Category;
import com.projet.entity.Offer;
import com.projet.exception.CategoryNotFoundException;
import com.projet.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){
        this.categoryService= categoryService;
    }
    @GetMapping
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Set<Offer> getCategoryOffers(@PathVariable Long id) throws CategoryNotFoundException {
        return categoryService.getAllCategoryOffers(id);
    }
}
