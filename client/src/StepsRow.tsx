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
                <Col xs={10}>
                <Form.Control name="desc" type="text" placeholder={`Step ${index + 1}`} value={step} onChange={(e) => handleChange(e, index)}/>
                </Col>
                <Col xs={2}>
                    <Image src={binImage} width={40} height={40} roundedCircle onClick={() => handleDelete(index)} />
                </Col>
            </Row>
        </Form.Group>
    );
}

export default StepRow;
