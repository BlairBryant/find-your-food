package com.blair.findYourFood.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blair.findYourFood.models.Category;
import com.blair.findYourFood.models.User;
import com.blair.findYourFood.repositories.CategoryRepository;

@Service
public class CategoryService {
	@Autowired
	private CategoryRepository categoryRepo;
	
	public List<Category> findCategories(User user) {
		return categoryRepo.findByUserIsOrderByNameAsc(user);
	}
	
	public Category findCategoryById(Long id) {
		return categoryRepo.findById(id).orElse(null);
	}
	
	public Category createCategory(Category category) {
		return categoryRepo.save(category);
	}
	
	public void deleteCategory(Long id) {
		categoryRepo.deleteById(id);
	}
}
