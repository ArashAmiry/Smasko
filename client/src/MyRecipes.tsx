import Container from "react-bootstrap/esm/Container";
import "./createRecipe.css";
import RecipeCardList from "./components/Recipe/RecipeCardList";
import IngredientsView from "./components/IngredientView";
import { useState } from "react";
import axios from "axios";
import './myRecipes.css';
import { Col, Row } from "react-bootstrap";

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
            <Container className="card-container " fluid>
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <RecipeCardList showIngredients={(id: number) => displayIngredientsView(id)} />
                    </Col>
                    <Col md={2}>
                        {showIngredients && <IngredientsView ingredients={ingredientsList} nrServ={nrServings} />}
                    </Col>
                </Row>



            </Container>
        </>
    );

}


export default MyRecipes;
