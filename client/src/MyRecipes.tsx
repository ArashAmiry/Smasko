import Container from "react-bootstrap/esm/Container";
import "./createRecipe.css";
import RecipeCardList from "./components/RecipeCardList";
import IngredientsView from "./components/IngredientView";
import { useState } from "react";
import axios from "axios";

export type Ingredient = {
    name: string;
    amount: number;
    unit: string;
};

function MyRecipes() {
    const [showIngredients, setShowIngredients] = useState(false);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([])
    const [nrServings, setNrServings] = useState(0);

    const displayIngredientsView = (id: number) => {
        if (!showIngredients) {
            fetchRecipeIngredients(id);
        }
        setShowIngredients(!showIngredients);
    }

    async function fetchRecipeIngredients(id: number) {
        try {
            const response = await axios.get(`http://localhost:8080/recipe/${id}`);
            setIngredientsList(response.data.ingredients)
            setNrServings(response.data.numberServings);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    }

    return (
        <>
            <Container>
                <RecipeCardList showIngredients={(id: number) => displayIngredientsView(id)} />
                {showIngredients && <IngredientsView ingredients={ingredientsList} nrServ={nrServings}/>}
            </Container>
        </>
    );

}


export default MyRecipes;
