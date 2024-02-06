import React, { ChangeEvent } from 'react';
import { Form, Container, Row, Col, Image, Button } from 'react-bootstrap';
import binImage from './images/bin.png'; 
import { Ingredient } from './CreateRecipe';

interface IngredientRowProps {
    ingredient : Ingredient;
    handleDelete: (index : number) => void;
    handleChange: (e : ChangeEvent, index : number) => void;
    index : number;
}   

function IngredientRow({ ingredient, handleDelete, handleChange, index }: IngredientRowProps) {
    return (
        <Form.Group>
            <Row>
                <Col xs={5}>
                    <Form.Control name="name" type="text" placeholder="Ingredient" value={ingredient.name} onChange={(e) => handleChange(e, index)} />
                </Col>
                <Col xs={2}>
                    <Form.Control name="amount" type="number" placeholder="Amount" value={ingredient.amount} onChange={(e) => handleChange(e, index)} />
                </Col>
                <Col xs={3}>
                    <Form.Select name="unit" value={ingredient.unit} onChange={(e) => handleChange(e, index)}>
                        <option value="st">st</option>
                        <option value="l">l</option>
                        <option value="dl">dl</option>
                        <option value="tbsp">tbsp</option>
                        <option value="tsp">tsp</option>
                        <option value="tsp">kg</option>
                    </Form.Select>
                </Col>
                <Col xs={2}>
                    <Image src={binImage} width={40} height={40} roundedCircle onClick={() => handleDelete(index)} />
                </Col>
            </Row>
        </Form.Group>
    );
}

export default IngredientRow;
