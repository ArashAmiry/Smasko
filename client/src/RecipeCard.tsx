import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function RecipeCard(props : {name : string, img : string, id : string}) {
  return (
    <Card style={{ width: '18rem' }} id={props.id}>
      <Card.Img variant="top" src={props.img} />
      <Link to={`/recipe/${props.id}`}><Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Button variant="primary">See ingredients</Button>
      </Card.Body>
      </ Link>
    </Card>
  );
}

export default RecipeCard;