import React, { useEffect, useState } from 'react';
// import { UserContext } from '../provider/Provider';
import axios from '../axios'
import { useParams, Link } from 'react-router-dom';
import '../styles/recipe.scss';
import Header from './Header';


const Recipe = () => {
    const [recipe, setRecipe] = useState({ foods: [], steps: [] });
    const [noRecipe, setNoRecipe] = useState(false);
    // const [user] = useContext(UserContext);
    const { id } = useParams();
    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await axios.get(`/recipe/${id}`);
            // console.log("recipes: ", response.data);
            if (response.data) {
                setRecipe(response.data);
            } else {
                setNoRecipe(prevValue => !prevValue)
            }
        }
        fetchRecipe();

    }, [setRecipe, id]);

    return (
        <div>
            <Header />
            <div className="recipe container">
                <Link to="/recipes">Back to Recipes</Link>
                {
                    !noRecipe
                        ?
                        <div>
                            <h2>{recipe.name}</h2>
                            <div className="recipe-top">
                                <img src={recipe.image} alt="Recipe" />
                                <div>
                                    <h3>Ingredients</h3>
                                    {recipe.foods.map(food => (
                                        <div className="steps recipe-ingredients" key={food.id}>
                                            <h4>{food.name}</h4>
                                            <span>{food.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h3>Steps</h3>
                            {recipe.steps.map(step => (
                                <div className="steps" key={step.id}>
                                    <p className="row"><span>•</span>{step.name}</p>
                                </div>
                            ))}
                        </div>
                        :
                        <h2>No recipe found</h2>
                }
            </div>
        </div>
    )
}

export default Recipe;