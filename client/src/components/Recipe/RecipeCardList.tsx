import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'; // Assuming RecipeCard is in the same directory
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import IngredientsView from '../IngredientView';
import '../recipeCardList.css';

type Recipe = {
    id: number;
    name: string;
    img: string;
    // Add more properties as needed
  };

function RecipeCardList(props : {showIngredients: (id : number) => void }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function updateRecipes() {
      const response = await axios.get<Recipe[]>("http://localhost:8080/recipe");
      const newRecipes : Recipe[] = response.data;
      setRecipes(newRecipes);
  }

  useEffect(() => {
    updateRecipes();
  }, []); 
    
  return (
    <Container className='cards-container'>
      <Row className="mt-4">
      {recipes.map((recipe) => (
        <Col key={recipe.id}  xl={3} className='mt-4'>
          <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
            <RecipeCard
              key={recipe.id}
              id={recipe.id.toString()} // Assuming each recipe has a unique id
              name={recipe.name}
              img={recipe.img}
              showIngredients={() => props.showIngredients(recipe.id)}
            />
          </Link>
        </Col>
      ))}
      </Row>
  </Container>
  );
}

export default RecipeCardList;
