import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Recipe } from "./RecipeCardList";
import { Col, Container, Form, Row } from "react-bootstrap";

function RecipeView() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const { recipeId } = useParams();

    async function fetchRecipe() {
        setTimeout(async () => {
            const response = await axios.get<Recipe>(`http://localhost:8080/recipe/${recipeId}`);
            const newRecipes: Recipe = response.data;
            setRecipe(newRecipes);
        }, 2000);
    }

    useEffect(() => {
        fetchRecipe();
    }, []);

    return (
        <Container className="mx-auto recipe-container">
            {!recipe && <p>Loading</p>}
            {recipe && (
            <Row className="mx-5">
                <h1 className="text-center mx-auto">Tacos with Creamy Garlic Sauce</h1>
                <img src="../../images/creamytaco.png" className="img rounded-4 mt-3 mx-auto px-0" />
                <Col sm className=" justify-content-center mt-3">
                    <div className="rounded-4 bg-light shadow-sm p-4">
                        <h2 className="mb-4">Ingredients</h2>
                        <Form.Group className="col-md-1 mb-3">
                            <label>Servings</label>
                            <select className="form-control">
                                <option >2</option>
                                <option selected>4</option>
                                <option>6</option>
                                <option>8</option>
                                <option>10</option>
                            </select>
                        </Form.Group>
                        <ul>
                            {recipe?.ingredients.map((ingredient) => (
                                <li className="text-start">{ingredient.amount + " " + ingredient.unit + " " + ingredient.name}</li>
                            ))}
                        </ul>
                    </div>
                </Col>
                <Col sm className="justify-content-center mt-3">
                    <div className="rounded-4 bg-light shadow-sm p-4">
                        <h2 className="mb-4">Instructions</h2>
                        {recipe.steps.map((step, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={<p><strong>Step {index + 1}:</strong> {step}</p>}
                                className="text-start"
                            />
                        ))}
                    </div>
                </Col>
            </Row>
            )}
        </Container>
    )
}

export default RecipeView;