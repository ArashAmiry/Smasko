import axios from "axios";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Image from 'react-bootstrap/Image';
import { useNavigate, useParams } from "react-router-dom";
import './recipeDetails.css'

interface Recipe {
  id: number;
  name: string;
  imagePath: string;
  numberServings: number;
  ingredients: { name: string, amount: number, unit: string }[];
  steps: string[];
}

function RecipeDetails() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [nrServings, setNrServings] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchRecipe() {
    try {
      const response = await axios.get(`http://localhost:8080/recipe/${id}`);
      setRecipe(response.data);
      setNrServings(response.data.numberServings)
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }
  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const handleDeleteRecipe = () => {
    axios.delete(`http://localhost:8080/recipe/${recipe.id}`)
      .then(response => {
        console.log('Recipe deleted successfully');
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
      });
  };

  return (
    <Container className="recipe-container mx-auto">
      <Row className="mx-5">
        <h1 className="text-center mx-auto">{recipe.name}</h1>
        <Image src="https://i.kym-cdn.com/photos/images/original/002/488/662/883.jpg"
          className="img rounded-4 mt-3 mx-auto px-0" />

        <Col sm className="justify-content-center mt-3">
          <div className="rounded-4 bg-light shadow-sm p-4">
            <h2 className="mb-4">Ingredients</h2>
            <Form.Group as={Col} md={2} className="mb-3">
              <Form.Label>Servings</Form.Label>
              <Form.Control as="select" defaultValue={recipe.numberServings} onChange={(e) => setNrServings(Number(e.target.value))}>
                <option key={2}>2</option>
                <option key={4}>4</option>
                <option key={6}>6</option>
                <option key={8}>8</option>
              </Form.Control>
            </Form.Group>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-start">
                  {ingredient.amount * nrServings / recipe.numberServings} {ingredient.unit} {ingredient.name}
                </li>
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
                id={`step-${index}`} // Add a unique id for each checkbox
                type="checkbox"
                label={<p><strong>Step {index + 1}:</strong> {step}</p>}
                className="text-start custom-checkbox"
              />
            ))}

          </div>
        </Col>
      </Row>
      <button className="btn btn-lg btn-danger mb-3 mt-3" onClick={handleDeleteRecipe}>Delete Recipe</button>
    </Container>
  );
}

export default RecipeDetails;