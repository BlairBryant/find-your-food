import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../provider/Provider';
import axios from '../axios'
// import normalAxios from 'axios';
import trashCan from '../styles/assets/trash-can.svg'
import '../styles/ingredients.scss'
import Header from './Header';

const Ingredients = (props) => {

    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [user] = useContext(UserContext);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get(`/ingredients/${user.id}`);
                let values = {};
                response.data.forEach(ingredient => {
                    values[`amount${ingredient.id}`] = ingredient.amount;
                })
                reset(values)
                setIngredients(response.data);
            } catch (e) {
                console.error(e)
            }
        }
        fetchIngredients();
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`/categories/${user.id}`);
                setCategories(response.data);
            } catch (e) {
                console.error(e)
            }
        }
        fetchCategories();

    }, [setIngredients, setCategories, user, reset]);

    const addCategory = async (data, e) => {
        try {
            const response = await axios.post(`/categories/${user.id}`, { name: data.categoryName });
            setCategories([...categories, response.data]);
            e.target.reset();
        } catch (e) {
            console.error(e)
        }
    }

    const addIngredient = async (data, e) => {
        try {
            const response = await axios.post(`/ingredients/${user.id}`, {
                name: data.name, amount: data.amount, category: {
                    id: +data.category
                }
            });
            let tempIngredients = [...ingredients, response.data];
            let values = {};
            tempIngredients.forEach(ingredient => {
                values[`amount${ingredient.id}`] = ingredient.amount;
            });
            reset(values)
            const categoriesResponse = await axios.get(`/categories/${user.id}`);
            setCategories(categoriesResponse.data);
            e.target.reset();
        } catch (e) {
            console.error(e)
        }
    }

    const updateAmount = async (data, e) => {
        e.preventDefault();
        const needUpdateIngredients = ingredients.filter(ingredient => ingredient.amount !== data[`amount${ingredient.id}`]);
        if (needUpdateIngredients.length) {
            const updatedIngredients = needUpdateIngredients.map(ingredient => {
                ingredient.amount = data[`amount${ingredient.id}`];
                return ingredient;
            })
            try {
                await axios.put('/ingredients', { ingredients: updatedIngredients });
            } catch (e) {
                console.error(e)
            }
        }
    }

    const deleteCategory = async (data) => {
        try {
            const response = await axios.delete(`/categories/${+data.deleteCategory}`);
            setCategories(response.data);
        } catch (e) {
            console.error(e)
        }
    }

    const deleteIngredient = async (e, ingredientId) => {
        e.preventDefault()
        try {
            await axios.delete(`/ingredients/${+ingredientId}`)
            const categoriesResponse = await axios.get(`/categories/${user.id}`);
            setCategories(categoriesResponse.data);
        } catch (e) {
            console.error(e)
        }
    }

    const goToRecipes = () => {
        props.history.push("/recipes");
    }

    // const getRecipes = async () => {
    //     console.log('recipeeees');
    //     const recipe = {}
    //     // Grabs list of 10 recipes containing the ingredients search param i.e. chicken
    //     // const response = await normalAxios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}&ingredients=ginger&instructionsRequired=true&limitLicense=true`)
    //     // console.log(response.data);
    //     // let ids = []
    //     // response.data.forEach(item => ids.push(item.id))
    //     // console.log(ids);

    //     // Gets info for 1 recipe but doesn't include steps to make recipe
    //     const recipeResponse = await normalAxios.get(`https://api.spoonacular.com/recipes/655178/information?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}`);
    //     console.log(recipeResponse.data);
    //     recipe.spoonacularId = recipeResponse.data.id;
    //     recipe.name = recipeResponse.data.title;
    //     recipe.image = recipeResponse.data.image;
    //     recipe.foods = recipeResponse.data.extendedIngredients.map(ingredient => {
    //         return {
    //             name: ingredient.name,
    //             amount: `${ingredient.amount} ${ingredient.unit}`
    //         }
    //     })
    //     // Gets steps info for 1 recipe
    //     const response = await normalAxios.get(`https://api.spoonacular.com/recipes/655178/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}`);
    //     console.log(response.data);
    //     recipe.steps = response.data[0].steps.map(step => step.step);
    //     console.log(recipe);
    //     const postRecipeResponse = await axios.post('/recipes', recipe);
    //     console.log(postRecipeResponse);
    // }

    return (
        <div>
            <Header />
            <div className="ingredients">
                <div className="justify-between">
                    <h1>My Fridge</h1>
                    <button onClick={() => setModalVisible(prevState => !prevState)}>+ Add Item</button>
                </div>
                <form onSubmit={handleSubmit(updateAmount)} className="ingredients-top-form">
                    {
                        categories.map(category => (
                            <div className="ingredients-category" key={category.id}>
                                <h2>{category.name}</h2>
                                {category.ingredients.map(ingredient => (
                                    <div className="row align-center ingredient-row" key={ingredient.id}>
                                        <span>{ingredient.name}</span>
                                        <input name={`amount${ingredient.id}`} ref={register} />
                                        <button onClick={e => deleteIngredient(e, ingredient.id)} className="trash-can"><img src={trashCan} alt="trash can" /></button>
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                    <button className="btn edit-amounts">Edit all amounts</button>
                </form>
                {/* <button onClick={getRecipes}>Get Recipes</button> */}
                <button onClick={goToRecipes} className="btn find-recipes">Find Matching Recipes</button>

                <div className={`modal-background modal-${modalVisible}`}>
                    <div className="modal-inner">
                        <form onSubmit={handleSubmit(addIngredient)} className="add-to-fridge">
                            <h3>Add to Fridge</h3>
                            <div className="add-ingredient">
                                <select name="category" ref={register}>
                                    {categories.map(category => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                <input name="name" ref={register} placeholder="ex. Mustard, Ham" />
                                <input name="amount" ref={register} placeholder="ex. 1 bottle, 2 lbs" />
                                <button className="btn">Add Ingredient</button>
                            </div>
                        </form>
                        <h3>Add or remove a category</h3>
                        <form onSubmit={handleSubmit(addCategory)} className="add-ingredient">
                            <input name="categoryName" ref={register} placeholder="ex. Condiments, Meat" />
                            <button className="btn">Add Category</button>
                        </form>
                        <form onSubmit={handleSubmit(deleteCategory)} className="add-ingredient">
                            <select name="deleteCategory" ref={register}>
                                {categories.map(category => (
                                    <option value={category.id} key={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <button className="btn">Delete Category</button>
                        </form>
                        <button onClick={() => setModalVisible(prevState => !prevState)} className="modal-delete">X</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ingredients;