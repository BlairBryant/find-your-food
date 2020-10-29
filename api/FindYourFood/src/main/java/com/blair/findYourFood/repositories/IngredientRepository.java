package com.blair.findYourFood.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.blair.findYourFood.models.Ingredient;
import com.blair.findYourFood.models.User;

@Repository
public interface IngredientRepository extends CrudRepository<Ingredient, Long>{
	List<Ingredient> findAll();
	List<Ingredient> findByUserIsOrderByCategoryNameAsc(User user);
}
