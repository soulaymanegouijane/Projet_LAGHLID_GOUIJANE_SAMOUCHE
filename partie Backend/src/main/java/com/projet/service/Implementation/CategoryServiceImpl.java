package com.projet.service.Implementation;

import com.projet.entity.Category;
import com.projet.entity.Offer;
import com.projet.exception.CategoryNotFoundException;
import com.projet.repository.CategoryRepository;
import com.projet.repository.OfferRepository;
import com.projet.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final OfferRepository offerRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, OfferRepository offerRepository) {
        this.categoryRepository = categoryRepository;
        this.offerRepository = offerRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Set<Offer> getAllCategoryOffers(Long id) throws CategoryNotFoundException {
       Category category = categoryRepository.findById(id)
               .orElseThrow(()->new CategoryNotFoundException("La catégorie avec l'id + "+id+" n'existe pas!"));
        return category.getOffers();
    }
}
