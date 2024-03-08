import { Container } from "react-bootstrap";
import './ingredientView.css';
import { Ingredient } from "./Ingredient";

function IngredientsView({ingredients, nrServ} : { ingredients: Ingredient[], nrServ: number }) {
  return (
    <Container className="ingredient-view-container">
      <h1 className="ingredients-title px-5">Ingredients</h1>
      <h5>Number of servings: {nrServ}</h5>
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
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