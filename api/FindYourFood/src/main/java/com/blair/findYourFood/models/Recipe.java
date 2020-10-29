package com.blair.findYourFood.models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name="recipes")
public class Recipe {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String spoonacularId;
	private String image;
	private Date createdAt;
	//TODO: Figure out how to store the below without creating a Step class
	@OneToMany(mappedBy="recipe", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Step> steps;
	@OneToMany(mappedBy="recipe", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Food> foods;
	
	public Recipe() {
    }
    
    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
    }
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSpoonacularId() {
		return spoonacularId;
	}

	public void setSpoonacularId(String spoonacularId) {
		this.spoonacularId = spoonacularId;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public List<Step> getSteps() {
		return steps;
	}

	public void setSteps(List<Step> steps) {
		this.steps = steps;
	}

	public List<Food> getFoods() {
		return foods;
	}

	public void setFoods(List<Food> foods) {
		this.foods = foods;
	}

}
