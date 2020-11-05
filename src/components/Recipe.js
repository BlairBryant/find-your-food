import React, { useEffect, useState } from 'react';
// import { UserContext } from '../provider/Provider';
import axios from '../axios'
import { useParams, Link } from 'react-router-dom';
import '../styles/recipe.scss';
import Header from './Header';
import favoriteIcon from '../styles/assets/star.svg';
import notFavoriteIcon from '../styles/assets/empty-star.svg';


const Recipe = () => {
    const [recipe, setRecipe] = useState({ foods: [], steps: [] });
    const [noRecipe, setNoRecipe] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    // const [user] = useContext(UserContext);
    const { id } = useParams();
    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await axios.get(`/recipe/${id}`);
            console.log("recipe: ", response.data);
            if (response.data) {
                setRecipe(response.data);
                const filteredForFavorite = response.data.favoritedBy.filter(user => user.id === 1);
                if (filteredForFavorite.length) {
                    setIsFavorited(true);
                }
            } else {
                setNoRecipe(prevValue => !prevValue);
            }
        }
        fetchRecipe();
    }, [setRecipe, id]);

    const setOrUnsetFavorite = async () => {
        if (!isFavorited) {
            const response = await axios.post(`/recipe/${id}/1`);
            console.log(response.data);
            setIsFavorited(true);
        } else {
            const response = await axios.delete(`/recipe/${id}/1`);
            console.log(response.data);
            if (response.data === "Success") {
                setIsFavorited(false);
            }
        }
    }

    return (
        <div>
            <Header />
            <div className="recipe container">
                <Link to="/recipes">Back to Recipes</Link>
                {
                    !noRecipe
                        ?
                        <div>
                            <div className="recipe-title">
                                <h2>{recipe.name}</h2>
                                <img src={isFavorited ? favoriteIcon : notFavoriteIcon} alt="Favorite Icon" className="favorite-icon" onClick={setOrUnsetFavorite}/>
                            </div>
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