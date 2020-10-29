package com.blair.findYourFood.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blair.findYourFood.models.Ingredient;
import com.blair.findYourFood.models.User;
import com.blair.findYourFood.repositories.IngredientRepository;

@Service
public class IngredientService {
	@Autowired
	private IngredientRepository ingredientRepo;
	
	public List<Ingredient> findAll(User user) {
		return ingredientRepo.findByUserIsOrderByCategoryNameAsc(user);
	}
	
	public Ingredient findIngredientById(Long id) {
		return ingredientRepo.findById(id).orElse(null);
	}
	
	public Ingredient createIngredient(Ingredient ingredient) {
		return ingredientRepo.save(ingredient);
	}
	
	public Ingredient updateIngredient(Long id, Ingredient ingredient) {
		return ingredientRepo.save(ingredient);
	}
	
	public void deleteIngredient(Long id) {
		ingredientRepo.deleteById(id);
	}
}
