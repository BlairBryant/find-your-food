package com.blair.findYourFood.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.blair.findYourFood.models.Food;

@Repository
public interface FoodRepository extends CrudRepository<Food, Long> {

}
