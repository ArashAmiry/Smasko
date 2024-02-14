import { ChangeEvent } from "react";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import IngredientsList, { IngredientsListProps } from "./IngredientsList";

interface RecipeIngredientsProps extends IngredientsListProps{
    changeNumServings: (e : ChangeEvent) => void,
    addIngredient: () => void
}

const RecipeIngredients = ({changeNumServings, ingredientsList, deleteIngredient, changeName, changeAmount, changeUnit, addIngredient} : RecipeIngredientsProps) => {
    return (
        <Form.Group className="ingredients my-3 px-3">
            <h2>Ingredients</h2>
            <Form.Label>Number of servings</Form.Label>
            <Form.Select defaultValue={4} onChange={e => changeNumServings(e)}>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
            </Form.Select>

            <Container className="p-0">
                <IngredientsList
                    ingredientsList={ingredientsList}
                    deleteIngredient={(index) => deleteIngredient(index)}
                    changeName={(name, index) => changeName(name, index)}
                    changeAmount={(amount, index) => changeAmount(amount, index)}
                    changeUnit={(unit, index) => changeUnit(unit, index)}
                />
            </Container>
            <Button variant="primary" onClick={() => addIngredient()}>
                Add new ingredient
            </Button>
        </Form.Group>
    );
}

export default RecipeIngredients;