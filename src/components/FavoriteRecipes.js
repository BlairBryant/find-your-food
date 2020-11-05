import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../provider/Provider';
import axios from '../axios';
import { Link } from 'react-router-dom';
import '../styles/favorite-recipes.scss';
import Header from './Header';

const FavoriteRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [noRecipes, setNoRecipes] = useState(false);
    const [user] = useContext(UserContext);

    useEffect(() => {
        const fetchRecipes = async () => {
            // const response = await axios.get(`/recipes/${user.id}`);
            const response = await axios.get(`/recipes/favorites/1`);
            console.log("recipes: ", response.data);
            if (response.data.length) {
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
            <div className="favorite-recipes">
                <h1>Favorite Recipes</h1>
                <div className="recipes">
                    {
                        !noRecipes
                            ?
                            recipes.map((recipe, i) => (
                                <div key={recipe.id} className="recipes__container">
                                    <h2>{recipe.name}</h2>
                                    <Link to={`/recipes/${recipe.id}`}><img src={recipe.image} alt="Recipe" className={`recipe${i}`}/></Link>
                                </div>
                            ))
                            :
                            <h2>No Recipes have been favorited</h2>
                    }
                </div>
            </div>
        </div>

    )
}

export default FavoriteRecipes;