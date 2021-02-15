import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../provider/Provider';
import axios from '../axios';
import { Link } from 'react-router-dom';
import '../styles/recipes.scss';
import Header from './Header';
import favoriteIcon from '../styles/assets/star.svg';
import notFavoriteIcon from '../styles/assets/empty-star.svg';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [noRecipes, setNoRecipes] = useState(false);
    const [user] = useContext(UserContext);
    const [ingredients, setIngredients] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`/recipes/${user.id}`);
                if (response.data) {
                    setRecipes(response.data);
                } else {
                    setNoRecipes(prevValue => !prevValue);
                }
            } catch (e) {
                console.error(e)
            }
        }
        fetchRecipes();

    }, [setRecipes, user]);

    const findRecipesByIngredient = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/recipes?ingredients=${ingredients}`)
            setRecipes(response.data);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <Header />
            <form onSubmit={findRecipesByIngredient} className="find-recipes__input">
                <input placeholder="Search for recipes by ingredient..." onChange={e => setIngredients(e.target.value)} />
            </form>
            <div className="recipes">
                {
                    !noRecipes
                        ?
                        recipes.map((recipe, i) => (
                            <div key={recipe.id} className="recipes__container">
                                <h2>{recipe.name}</h2>
                                <img src={recipe.favoritedBy.length ? favoriteIcon : notFavoriteIcon} alt="Favorite Icon" className="favorite-icon" />
                                <Link to={`/recipes/${recipe.id}`}><img src={recipe.image} alt="Recipe" className={`recipe${i}`} /></Link>
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