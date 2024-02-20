import { ChangeEvent } from "react";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import IngredientsList, { IngredientsListProps } from "./IngredientsList";
import Col from "react-bootstrap/esm/Col";
import '../recipeIngredients.css';
import '../createRecipeSections.css';
import { Ingredient } from "./Ingredient";

interface RecipeIngredientsProps {
    setIngredientsList: (ingredientsList: Ingredient[]) => void,
    ingredientsList: Array<Ingredient>,
    setNumServings: (numServings: number) => void,
    numServings: number
}

const RecipeIngredients = ({ ingredientsList, setIngredientsList, numServings, setNumServings }: RecipeIngredientsProps) => {

    const addIngredient = () => {
        let newIngredient: Ingredient = { name: "", amount: 1, unit: "st" };
        setIngredientsList([...ingredientsList, newIngredient]);
    }

    const deleteIngredient = (index: number) => {
        const list = [...ingredientsList];
        list.splice(index, 1);
        setIngredientsList(list);
    }
    const changeName = (name: string, index: number) => {
        const list = [...ingredientsList];
        list[index].name = name;
        setIngredientsList(list);
    }
    const changeAmount = (amount: number, index: number) => {
        const list = [...ingredientsList];
        list[index].amount = amount;
        setIngredientsList(list);
    }

    const changeUnit = (unit: string, index: number) => {
        const list = [...ingredientsList];
        list[index].unit = unit;
        setIngredientsList(list);
    }

    const changeNumServings = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setNumServings(parseInt(value));
    }

    return (
        <Form.Group as={Col} sm className="section justify-content-center mt-3 rounded-4 bg-light shadow-sm p-4">
            <h2>Ingredients</h2>
            <Container className="servings-container col-md-1 mb-3" >
                <Form.Label>Number of servings</Form.Label>
                <Form.Select defaultValue={numServings} onChange={e => changeNumServings(e)}>
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