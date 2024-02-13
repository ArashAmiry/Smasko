import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function RecipeCard(props: { name: string, img: string, id: string, showIngredients: (id : number) => void }) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    props.showIngredients(parseInt(props.id));
  };
  return (
    <Link  to={`/recipe/${props.id}`}>
    <Card id={props.id}>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Button variant="primary" onClick={handleClick}>See ingredients</Button>
      </Card.Body>
    </Card>
    </Link>
  );
}

export default RecipeCard;