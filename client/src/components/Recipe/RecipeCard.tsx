import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './recipeCard.css';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
import Heart from '@react-sandbox/heart'
import { Container } from 'react-bootstrap';
import axios from "axios";

interface RecipeCardProps {
  name: string,
  img: string,
  rating: number, 
  like: boolean, 
  id: string, 
  showIngredients: (id : string) => void
}

function RecipeCard({name, img, rating, like, id, showIngredients}: RecipeCardProps) {

  // Displays sidebar with the recipes ingredients when clicked
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    showIngredients(id);
  };

  const [isClicked, setisClick] = useState(like);

  // Adds recipe to one's favorites
  const handleHeartClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const clicked = !isClicked;
    setisClick(clicked);
    
    await axios.patch(`http://localhost:8080/recipe/${id}`,
      {"liked": clicked}
    );
  }

  return (
    <Card id={id} className='card'>
      <Container className="px-0 position-relative" >
        <Card.Img className="recipeCardImage" variant="top" src={img} />
        <button className='py-0 heartBtn' style={{ position: 'absolute', top: 0, left: 0 }} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleHeartClick(e)}>
          <Heart
            width={40}
            height={40}
            active={isClicked}
            onClick={() => (setisClick(isClicked))}
            strokeWidth={50}
          />
        </button>
      </Container>
      <Card.Body className='card-body justify-content-center'>
              <Card.Title className="two-line-name">{name}</Card.Title>
        <Button variant="primary" onClick={(e) => handleClick(e)}>See ingredients</Button>
        <Rating className="px-auto" initialValue={rating} readonly={true} size={30} />
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;