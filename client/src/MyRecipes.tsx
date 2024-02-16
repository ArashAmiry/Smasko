import Container from "react-bootstrap/esm/Container";
import "./createRecipe.css";
import RecipeCardList from "./components/Recipe/RecipeCardList";
import IngredientsView from "./components/IngredientView";
import { FormEvent, useState } from "react";
import axios from "axios";
import './myRecipes.css';
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";

export type Ingredient = {
    name: string;
    amount: number;
    unit: string;
};

function MyRecipes() {
    const [showIngredients, setShowIngredients] = useState(false);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([])
    const [nrServings, setNrServings] = useState(0);
    const [searchTerm, setSearchTerm] = useState<string>('');

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

    const searchRecipe = (e: FormEvent) => {
        
        e.preventDefault();
    }

    const changeSearchTerm = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        // console.log(searchTerm);
    };

    return (
        <>
            <Form onSubmit={(e) => searchRecipe(e)}>
                <Form.Group>
                    <Form.Control
                        className="recipe-name mx-auto mt-3"
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => changeSearchTerm(e.target.value)}/>
                </Form.Group>   
            </Form>
            <Container className="card-container " fluid>
                <Row>
                    <Col xl={2}></Col>
                    <Col xl={8}>
                        <RecipeCardList showIngredients={(id: number) => displayIngredientsView(id)} searchTerm={searchTerm} />
                    </Col>
                    <Col xl={2}>
                        {showIngredients && <IngredientsView ingredients={ingredientsList} nrServ={nrServings} />}
                    </Col>
                </Row>
            </Container>
        </>
    );
}


export default MyRecipes;
