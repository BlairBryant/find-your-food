package com.blair.findYourFood.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.blair.findYourFood.models.Step;

@Repository
public interface StepRepository extends CrudRepository<Step, Long> {

}
