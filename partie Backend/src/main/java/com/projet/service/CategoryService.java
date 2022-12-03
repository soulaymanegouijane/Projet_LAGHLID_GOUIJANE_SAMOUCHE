package com.projet.service;

import com.projet.entity.Category;
import com.projet.entity.Offer;
import com.projet.exception.CategoryNotFoundException;

import java.util.List;
import java.util.Set;

public interface CategoryService {
    List<Category> getAllCategories();

    Set<Offer> getAllCategoryOffers(Long id) throws CategoryNotFoundException;
}
