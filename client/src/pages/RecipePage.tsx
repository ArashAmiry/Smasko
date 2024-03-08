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

function RecipePage(props : {path: string}) {
    const [currentIngredientsID, setCurrentIngredientsID] = useState<string>("")
    const [showIngredients, setShowIngredients] = useState(false);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([])
    const [nrServings, setNrServings] = useState(0);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Function to toggle the IngredientsView
    const displayIngredientsView = async (id: string) => {
        if (id === currentIngredientsID) {
            setCurrentIngredientsID("");
            setShowIngredients(false);
        }
        else {
            setCurrentIngredientsID(id);
            await fetchRecipeIngredients(id);
            setShowIngredients(true);
        }
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
        <Container className="form-container">
            <Form onSubmit={(e) => searchRecipe(e)}>
                <Form.Group>
                    <Form.Control
                        className="search-bar mx-auto my-3"
                        type="search"
                        placeholder="Search..."
                        onChange={(e) => changeSearchTerm(e.target.value)}/>
                </Form.Group>   
            </Form>
            </Container>
            
            <Container className="card-container " fluid>
                <Row className="mx-0">
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
