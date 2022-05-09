import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Recipes = () => {
    // レシピを格納するstate
    const [recipes, setRecipes] = useState([])
    // inputボックスに入力した値を格納するstate
    const [inputValue, setInputValue] = useState('');
    // 
    const [searchCriteria, setSearchCriteria] = useState('');
    // エラーメッセを格納するstate
    const [errorMessage, setErrorMessage] = useState('');

    const fetchAllRecipes = useCallback(() => {
        axios.get('/api/recipes')
            .then(res => {
                setRecipes(res.data.recipes)
            })
            .catch(res => {
                setErrorMessage(
                    `Failed to fetch recipes, error message: ${res.statusText}`)
            })
    }, []);

    useEffect(() => {
        fetchAllRecipes()
    }, [])

    const handleOnInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        fetchRecipeByIngredient(inputValue)
    }

    const fetchRecipeByIngredient = useCallback((ingredient) => {
        axios.get(`/api/recipes?ingredient=${ingredient}`)
            .then(res => {
                setSearchCriteria(ingredient);
                setRecipes(res.data.recipes)
            })
            .catch(res => {
                setErrorMessage(
                    `Failed to fetch recipes, error message: ${res.statusText}`)
            })
    }, []);


    return (
        <div>
            <h1>Recipe Finder</h1>
            <form onSubmit={handleOnSubmit}>
                <input type="text"
                    name="ingredient"
                    placeholder="Enter an ingredient to find recipes..."
                    value={inputValue}
                    onChange={handleOnInputChange}
                    label="ingregient"
                />
                <button type="submit">Find</button>
            </form>
            {errorMessage && (
                <p>{errorMessage}</p>
            )}
            {searchCriteria && (
                <p>Showing results for {searchCriteria}:</p>
            )}
            <ul>
                {recipes.map(recipe => (
                    <li
                        key={recipe.id}
                    >{recipe.title}</li>

                ))}
            </ul>
        </div>
    )
}

export default Recipes;
