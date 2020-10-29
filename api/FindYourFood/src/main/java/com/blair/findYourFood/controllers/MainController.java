package com.blair.findYourFood.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blair.findYourFood.models.Category;
import com.blair.findYourFood.models.Food;
import com.blair.findYourFood.models.Ingredient;
import com.blair.findYourFood.models.IngredientsList;
import com.blair.findYourFood.models.Recipe;
import com.blair.findYourFood.models.Step;
import com.blair.findYourFood.models.User;
import com.blair.findYourFood.repositories.FoodRepository;
import com.blair.findYourFood.repositories.RecipeRepository;
import com.blair.findYourFood.repositories.StepRepository;
import com.blair.findYourFood.services.CategoryService;
import com.blair.findYourFood.services.IngredientService;
import com.blair.findYourFood.services.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class MainController {
	@Autowired
	private UserService uService;
	@Autowired
	private CategoryService cService;
	@Autowired
	private IngredientService iService;
	@Autowired
	private FoodRepository fRepo;
	@Autowired
	private StepRepository sRepo;
	@Autowired
	private RecipeRepository rRepo;
	
	@PostMapping("/register")
    public User registerUser(@RequestBody User user) {
		System.out.println(user.getPassword());
		User newUser = uService.registerUser(user);
		return newUser;
    }
	
	@PostMapping("/login")
    public User loginUser(@RequestBody User user) {
    	if (uService.authenticateUser(user.getEmail(), user.getPassword())) {
    		return uService.findByEmail(user.getEmail());
    	} else {
    		return null;
    	}
    }
	
	@GetMapping("/ingredients/{user_id}")
	public List<Ingredient> getIngredients(@PathVariable("user_id") Long user_id) {
		return iService.findAll(uService.findUserById(user_id));
	}
	
	@PostMapping(value="/ingredients/{user_id}", consumes="application/json")
	public Ingredient createIngredient(@RequestBody Ingredient ingredient, @PathVariable("user_id") Long user_id) {
		Category category = cService.findCategoryById(ingredient.getCategory().getId());
		ingredient.setCategory(category);
		ingredient.setCategoryName(category.getName());
		User user = uService.findUserById(user_id);
		ingredient.setUser(user);
		Ingredient newIngredient = iService.createIngredient(ingredient);
		return newIngredient;
	}
	
	@PutMapping("/ingredients")
	public String editIngredient(@RequestBody IngredientsList ingredients) {
		// I am sending up {ingredients: ArrayList<Ingredient>} how should I catch this?
		System.out.println("hit edit ingredient");
		for (Ingredient ingredient: ingredients.getIngredients()) {
			Ingredient oldIngredient = iService.findIngredientById(ingredient.getId());
			oldIngredient.setAmount(ingredient.getAmount());
			iService.updateIngredient(ingredient.getId(), oldIngredient);
		}
		return "Succes";
	}
	
	@DeleteMapping("/ingredients/{id}")
	public List<Ingredient> deleteIngredient(@PathVariable("id") Long id) {
		Ingredient ingredient = iService.findIngredientById(id);
		User user = ingredient.getUser();
		iService.deleteIngredient(id);
		return iService.findAll(user);
	}
	
	@GetMapping("/categories/{user_id}")
	public List<Category> getCategories(@PathVariable("user_id") Long user_id) {
		User user = uService.findUserById(user_id);
		return cService.findCategories(user);
	}
	
	@PostMapping("/categories/{user_id}")
	public Category createCategory(@RequestBody Category category, @PathVariable("user_id") Long user_id) {
		User user = uService.findUserById(user_id);
		System.out.println("hit categories post");
		category.setUser(user);
		return cService.createCategory(category);
	}
	
	@DeleteMapping("/categories/{id}")
	public List<Category> deleteCategory(@PathVariable Long id) {
		System.out.println("hit categories delete");
		Category category = cService.findCategoryById(id);
		User user = category.getUser();
		cService.deleteCategory(id);
		return cService.findCategories(user);
	}
	
	@GetMapping("/recipe/{id}")
	public Recipe getRecipe(@PathVariable("id") Long id) {
		return rRepo.findById(id).orElse(null);
	}
	
	@GetMapping("/recipes/{user_id}")
	public List<Recipe> getRecipes(@PathVariable("user_id") Long id) {
		System.out.println("hit recipes get");
		User user = uService.findUserById(id);
		List<Ingredient> ingredients = iService.findAll(user);
		List<String> ingredientsStrings = new ArrayList<String>();
		// Get all ingredients for a user and put them in an array of strings
		for (Ingredient ingredient: ingredients) {
			ingredientsStrings.add(ingredient.getName().toLowerCase());
		}
		// Get all recipes and check if the user has all the necessary ingredients 
		List<Recipe> matchingRecipes = new ArrayList<Recipe>();
		List<Recipe> allRecipes = rRepo.findAll();
		for (Recipe recipe: allRecipes) {
			List<String> foodsStrings = new ArrayList<String>();
			for (Food food: recipe.getFoods()) {
				foodsStrings.add(food.getName().toLowerCase());
			}
			if (ingredientsStrings.containsAll(foodsStrings)) {
				matchingRecipes.add(recipe);
			}
		}
		
		if (matchingRecipes.size() > 0) {
			return matchingRecipes;
		} else {
			return null;
		}
	}
	
	@PostMapping("/recipes")
	public String postRecipe(@RequestBody Recipe recipe) {
		// Post a Recipe with Foods and Steps from Spoonacular API
		System.out.println("hit recipes post");
		System.out.println(recipe.getName());
		System.out.println(recipe.getSpoonacularId());
		System.out.println(recipe.getImage());
		
		List<Food> newFoods = recipe.getFoods();
		List<Step> newSteps = recipe.getSteps();
		recipe.setFoods(null);
		recipe.setSteps(null);
		Recipe newRecipe = rRepo.save(recipe);
		
		for (Food food: newFoods) {
			Food newFood = new Food(food.getName(), food.getAmount());
			newFood.setRecipe(newRecipe);
			fRepo.save(newFood);
		}
		for (Step step: newSteps) {
			Step newStep = new Step(step.getName());
			newStep.setRecipe(newRecipe);
			sRepo.save(newStep);
		}

		return "success";
	}
	

}
