import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './recipeCard.css';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
import Heart from '@react-sandbox/heart'
import { Row, Col } from 'react-bootstrap';
import axios from "axios";

function RecipeCard(props: { name: string, img: string, rating: number, like: boolean, id: string, showIngredients: (id : string) => void}) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    props.showIngredients(props.id);
  };

  const [isClicked, setisClick] = useState(props.like);

  const handleHeartClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const clicked = !isClicked;
    setisClick(clicked);
    
    await axios.patch(`http://localhost:8080/recipe/${props.id}`, 
      {"liked": clicked}
    );
  }

  return (
    <Card id={props.id} className='card'>

      <Card.Img variant="top" src={props.img} />

      <Card.Body className='card-body'>
        <Row style={{ justifyContent: 'center' }}>
          <Col sm={10} className='py-1'>
            <Card.Title>{props.name}</Card.Title>
          </Col>

          <Col sm={2}>
            <button className='py-0 heartBtn' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleHeartClick(e)}>
              <Heart
                width={24}
                height={24}
                active={isClicked}
                onClick={() => (setisClick(isClicked))}/>
            </button>
          </Col>
        </Row>

        <Button variant="primary" onClick={(e) => handleClick(e)}>See ingredients</Button>
        <Rating className="px-auto" initialValue={props.rating} readonly={true} size={30}/>
      </Card.Body>

    </Card>
  );
}

export default RecipeCard;