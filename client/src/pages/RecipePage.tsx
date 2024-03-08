import Container from "react-bootstrap/esm/Container";
import RecipeCardList from "../components/Recipe/RecipeCardList";
import { FormEvent, useState } from "react";
import axios from "axios";
import './recipePage.css';
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import IngredientsView from "../components/Recipe/IngredientView";
import DisplayRecipes from "../components/Recipe/DisplayRecipes";

export type Ingredient = {
    name: string;
    amount: number;
    unit: string;
};

function RecipePage({ path }: { path: string }) {
    const [showIngredients, setShowIngredients] = useState(false);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([])
    const [nrServings, setNrServings] = useState(0);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Function to toggle the IngredientsView
    const displayIngredientsView = (id: string) => {
        if (!showIngredients) {
            fetchRecipeIngredients(id);
        }
        setShowIngredients(!showIngredients);
    }

    async function fetchRecipeIngredients(id: string) {
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
    };

    return (
        <>
            <Container className="card-container " fluid>
                <Row>
                    <Col xl={2}></Col>
                    <Col xl={8}>
                        <Form onSubmit={(e) => searchRecipe(e)}>
                            <Form.Group>
                                <Form.Control
                                    className="search-bar mx-auto mt-3"
                                    type="search"
                                    placeholder="Search..."
                                    onChange={(e) => changeSearchTerm(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <DisplayRecipes path={path} showIngredients={(id: string) => displayIngredientsView(id)} searchTerm={searchTerm} />
                    </Col>
                    <Col xl={2}>
                        {showIngredients && <IngredientsView ingredients={ingredientsList} nrServ={nrServings} />}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default RecipePage;
