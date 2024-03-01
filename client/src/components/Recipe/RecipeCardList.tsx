import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import './recipeCardList.css';
import { Recipe } from './Recipe';

// function RecipeCardList(props : {path: string, showIngredients: (id : string) => void, searchTerm: string}) {
function RecipeCardList({recipes, showIngredients} : {recipes: Recipe[], showIngredients: (id : string) => void}) {
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
              showIngredients={() => showIngredients(recipe._id)}
            />
          </Link>
        </Col>
      ))}
      </Row>
  </Container>
  );
}

export default RecipeCardList;