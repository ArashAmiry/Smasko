import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../recipeCard.css';
import { Rating } from 'react-simple-star-rating';

function RecipeCard(props: { name: string, img: string, rating: number, id: string, showIngredients: (id : string) => void }) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    props.showIngredients(props.id);
  };

  return (
    <Card id={props.id} className='card'>
      <Card.Img variant="top" src={props.img} />
      <Card.Body className='card-body'>
        <Card.Title>{props.name}</Card.Title>
        <Button variant="primary" onClick={(e) => handleClick(e)}>See ingredients</Button>
        <Rating initialValue={props.rating} readonly={true}/>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;