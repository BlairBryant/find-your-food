import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../provider/Provider';
import axios from '../axios';
import { Link } from 'react-router-dom';
import '../styles/recipes.scss';
import Header from './Header';


const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [noRecipes, setNoRecipes] = useState(false);
    const [user] = useContext(UserContext);

    useEffect(() => {
        const fetchRecipes = async () => {
            // const response = await axios.get(`/recipes/${user.id}`);
            const response = await axios.get(`/recipes/1`);
            // console.log("recipes: ", response.data);
            if (response.data) {
                setRecipes(response.data);
            } else {
                setNoRecipes(prevValue => !prevValue);
            }
        }
        fetchRecipes();

    }, [setRecipes, user]);

    return (
        <div>
            <Header />
            <div className="recipes">
                {
                    !noRecipes
                        ?
                        recipes.map((recipe, i) => (
                            <div key={recipe.id} className="column align-center">
                                <h2>{recipe.name}</h2>
                                <Link to={`/recipes/${recipe.id}`}><img src={recipe.image} alt="Recipe" className={`recipe${i}`}/></Link>
                            </div>
                        ))
                        :
                        <h2>No Recipes Found with your ingredients</h2>
                }

            </div>
        </div>

    )
}

export default Recipes;