import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import './recipeCardList.css';
import { Recipe } from './Recipe';

  //TODO move searching higher up
function RecipeCardList(props : {path: string, showIngredients: (id : string) => void, searchTerm: string}) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function updateRecipes() {
      await axios.get<Recipe[]>(`http://localhost:8080/${props.path}`)
      .then( function(response) {
        const newRecipes : Recipe[] = response.data;

        const filteredRecipes = newRecipes.filter(recipe => recipe.name.toLowerCase().startsWith(props.searchTerm.toLowerCase()));
        setRecipes(filteredRecipes);})
      .catch( function (error) {
          console.log(error);
      });
  }

  useEffect(() => {
    updateRecipes();
  }, [props.searchTerm]); 
    
  return (
    <Container className='cards-container'>
      <Row className="mt-4">
      {recipes.map((recipe) => (
        <Col key={recipe._id}  xl={3} className='mt-4'>
          <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
            <RecipeCard
              key={recipe._id}
              id={recipe._id}
              name={recipe.name}
              img={recipe.image}
              rating={recipe.rating}
              like={recipe.like}
              showIngredients={() => props.showIngredients(recipe._id)}
            />
          </Link>
        </Col>
      ))}
      </Row>
  </Container>
  );
}

export default RecipeCardList;