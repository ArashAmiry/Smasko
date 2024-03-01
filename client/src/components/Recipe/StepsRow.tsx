import React, { ChangeEvent, useState } from 'react';
import { Form, Row, Col, Image } from 'react-bootstrap';
import binImage from '../../images/bin.png';
import './stepRow.css';

interface StepRowProps {
    step: string;
    handleDelete: (index: number) => void;
    handleChange: (e: ChangeEvent, index: number) => void;
    index: number;
}

function StepRow({ step, handleDelete, handleChange, index }: StepRowProps) {
    const [showStepError, setShowStepError] = useState(false);

    function validateName(e: React.FocusEvent) {
        const { value } = e.target as HTMLInputElement;
        if (value.trim()) {
            setShowStepError(false);
        } else {
            setShowStepError(true);
        }
    }

    return (
        <Form.Group className='step-row'>
            <Row>
                <Col xs={10}>
                    <Form.Control name="desc" type="text" placeholder={`Step ${index + 1}`} value={step} aria-required="true" onChange={(e) => handleChange(e, index)}
                        onBlur={(e) => validateName(e)} />
                </Col>

                <Col xs={2}>
                    <Image src={binImage} width={40} height={40} roundedCircle className='delete-button' onClick={() => handleDelete(index)} />
                </Col>
                {showStepError && <p style={{ color: 'red' }}>Error: Step description cannot be empty</p>}
            </Row>
        </Form.Group>
    );
}

export default StepRow;