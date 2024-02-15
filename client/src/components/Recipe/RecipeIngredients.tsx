import { ChangeEvent } from "react";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import IngredientsList, { IngredientsListProps } from "./IngredientsList";
import Col from "react-bootstrap/esm/Col";
import '../recipeIngredients.css';
import '../createRecipeSections.css';

interface RecipeIngredientsProps extends IngredientsListProps{
    changeNumServings: (e : ChangeEvent) => void,
    addIngredient: () => void
}

const RecipeIngredients = ({changeNumServings, ingredientsList, deleteIngredient, changeName, changeAmount, changeUnit, addIngredient} : RecipeIngredientsProps) => {
    return (
        <Form.Group as={Col} sm className="section justify-content-center mt-3 rounded-4 bg-light shadow-sm p-4">
            <h2>Ingredients</h2>
            <Container className="servings-container col-md-1 mb-3" >
                    <Form.Label>Number of servings</Form.Label>
                    <Form.Select defaultValue={4} onChange={e => changeNumServings(e)}>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                    </Form.Select>
                </Container>

            <Container className="p-0">
                <IngredientsList
                    ingredientsList={ingredientsList}
                    deleteIngredient={(index) => deleteIngredient(index)}
                    changeName={(name, index) => changeName(name, index)}
                    changeAmount={(amount, index) => changeAmount(amount, index)}
                    changeUnit={(unit, index) => changeUnit(unit, index)}
                />
            </Container>
            <Button variant="outline-secondary" className="btn-outline-secondary mt-3" onClick={() => addIngredient()}>
                    Add new ingredient
                </Button>
        </Form.Group>
    );
}

export default RecipeIngredients;