package com.blair.findYourFood.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.blair.findYourFood.models.Category;
import com.blair.findYourFood.models.User;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long>{
	List<Category> findAll();
	List<Category> findByUserIsOrderByNameAsc(User user);
}
