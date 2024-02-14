import React, { ChangeEvent, useState } from 'react';
import { Form, Container, Row, Col, Image, Button } from 'react-bootstrap';
import binImage from '../../images/bin.png';
import { Ingredient } from '../../CreateRecipe';

interface IngredientRowProps {
    ingredient: Ingredient;
    handleDelete: (index: number) => void;
    changeName: (name: string) => void;
    changeAmount: (amount: number) => void;
    changeUnit: (unit: string) => void;
    index: number;
}

function IngredientRow({ ingredient, handleDelete, changeName, changeAmount, changeUnit, index }: IngredientRowProps) {
    const [val, changeVal] = useState<string>(ingredient.amount.toString())

    return (
        <Form.Group>
            <Row>
                <Col xs={5}>
                    <Form.Control name="name" type="text" placeholder="Ingredient" value={ingredient.name} onChange={(e) => {
                        const { value } = e.target;
                        changeName(value);
                    }} />
                </Col>
                <Col xs={2}>
                    <Form.Control name="amount" type="text" placeholder="Amount" value={val} onChange={(e) => {
                        changeVal(e.target.value);

                        const newAmount: number = parseInt(e.target.value);
                        if (newAmount > 0) {
                            changeAmount(newAmount);
                        } else {
                            console.log(newAmount);
                            changeAmount(0);
                        }
                    }}/>
                </Col>
                <Col xs={3}>
                    <Form.Select name="unit" value={ingredient.unit} onChange={(e) => {
                        const { value } = e.target;
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
                    <Image src={binImage} width={40} height={40} roundedCircle onClick={() => handleDelete(index)} />
                </Col>
            </Row>
        </Form.Group>
    );
}

export default IngredientRow;
