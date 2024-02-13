import React, { ChangeEvent } from 'react';
import { Form, Container, Row, Col, Image, Button } from 'react-bootstrap';
import binImage from './images/bin.png'; 

interface StepRowProps {
    step : string;
    handleDelete: (index : number) => void;
    handleChange: (e : ChangeEvent, index : number) => void;
    index : number;
}   

function StepRow({ step, handleDelete, handleChange, index }: StepRowProps) {
    return (
        <Form.Group>
            <Row>
                <Col sm={10}>
                <Form.Control name="desc" type="text" placeholder={`Step ${index + 1} in the recipe`} value={step} onChange={(e) => handleChange(e, index)}/>
                </Col>
                <Col sm={2}>
                    <Image src={binImage} width={40} height={40} roundedCircle className='delete-button' onClick={() => handleDelete(index)} />
                </Col>
            </Row>
        </Form.Group>
    );
}

export default StepRow;
