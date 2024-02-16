import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import '../recipeCardList.css';

type Recipe = {
    id: number;
    name: string;
    img: string;
  };

function RecipeCardList(props : {showIngredients: (id : number) => void, searchTerm: string}) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function updateRecipes() {
      const response = await axios.get<Recipe[]>("http://localhost:8080/recipe");
      const newRecipes : Recipe[] = response.data;

      const filteredRecipes = newRecipes.filter(recipe => recipe.name.toLowerCase().startsWith(props.searchTerm.toLowerCase()));

      setRecipes(filteredRecipes);
  }

  useEffect(() => {
    updateRecipes();
  }, [props.searchTerm]); 
    
  return (
    <Container className='cards-container'>
      <Row className="mt-4">
      {recipes.map((recipe) => (
        <Col key={recipe.id}  xl={3} className='mt-4'>
          <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
            <RecipeCard
              key={recipe.id}
              id={recipe.id.toString()}
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
