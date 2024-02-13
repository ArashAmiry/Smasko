import React, { ChangeEvent } from 'react';
import { Form, Container, Row, Col, Image, Button } from 'react-bootstrap';
import binImage from '../images/bin.png'; 
import { Ingredient } from '../CreateRecipe';
import './ingredientRow.css';

interface IngredientRowProps {
    ingredient : Ingredient;
    handleDelete: (index : number) => void;
    changeName : (name : string) => void;
    changeAmount : (amount : number) => void;
    changeUnit : (unit : string) => void;
    index : number;
}   

function IngredientRow({ ingredient, handleDelete, changeName, changeAmount, changeUnit, index }: IngredientRowProps) {
    return (
        <Form.Group className='ingredient-row'>
            <Row>
                <Col xs={5}>
                    <Form.Control name="name" type="text" placeholder="Ingredient" value={ingredient.name} onChange={(e) => {
                            const {value} = e.target;
                            changeName(value);
                    }} />
                </Col>
                <Col xs={2}>
                    <Form.Control name="amount" type="number" placeholder="Amount" className='no-spinner' value={ingredient.amount} onChange={(e) => {
                            const {value} = e.target;
                            changeAmount(parseInt(value));
                    }} />
                </Col>
                <Col xs={3}>
                    <Form.Select name="unit" value={ingredient.unit} onChange={(e) => {
                            const {value} = e.target;
                            changeUnit(value);
                    }}>
                        <option value="st">st</option>
                        <option value="l">l</option>
                        <option value="dl">dl</option>
                        <option value="tbsp">tbsp</option>
                        <option value="tsp">tsp</option>
                        <option value="kg">kg</option>
                    </Form.Select>
                </Col>
                <Col xs={2}>
                    <Image src={binImage} width={40} height={40} roundedCircle className='delete-button' onClick={() => handleDelete(index)} />
                </Col>
            </Row>
        </Form.Group>
    );
}

export default IngredientRow;
