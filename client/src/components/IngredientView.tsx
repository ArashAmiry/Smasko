import { Container } from "react-bootstrap";
import './ingredientView.css';
import { Ingredient } from "../CreateRecipe";

function IngredientsView(props : {ingredients : Ingredient[], nrServ : number}){
    return (
        <Container className="ingredient-view-container">
            <h3>Ingredients</h3>
            <h5>Number of servings: {props.nrServ}</h5>
            <ul>
              {props.ingredients.map((ingredient, index) => (
                <li key={index} className="text-start">
                {
                  ingredient.amount
                } {ingredient.unit} {ingredient.name}
              </li>
              ))}
            </ul>
        </Container>
    );
}
 
export default IngredientsView;