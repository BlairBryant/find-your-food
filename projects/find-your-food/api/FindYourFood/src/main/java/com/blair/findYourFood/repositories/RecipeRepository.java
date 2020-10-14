package com.blair.findYourFood.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.blair.findYourFood.models.Recipe;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Long> {
	List<Recipe> findAll();
}
