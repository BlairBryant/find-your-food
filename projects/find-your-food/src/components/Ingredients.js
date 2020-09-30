import React, { useEffect, useState } from 'react';
import axios from '../axios'

const Ingredients = () => {
    const {ingredients, setIngredients} = useState([])

    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await axios.get("/ingredients")
        }
    }, []);

    return (
        <div>

        </div>
    )
}

export default Ingredients;