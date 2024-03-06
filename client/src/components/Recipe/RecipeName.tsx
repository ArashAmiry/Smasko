import { Container, Button } from "react-bootstrap";
import StepRow from "./StepsRow";
import { ChangeEvent } from "react";
import Form from "react-bootstrap/esm/Form";
import Col from "react-bootstrap/esm/Col";
import '../createRecipeSections.css';

interface StepsProps {
    recipeName: string;
    setRecipeName: (recipeName: string) => void;
}

const RecipeName = ({ recipeName, setRecipeName }: StepsProps) => {

    const changeRecipeName = (e: ChangeEvent) => {
        let { value } = e.target as HTMLInputElement;
        setRecipeName(value);
    }

    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
                className="recipe-name mx-auto mt-3"
                type="text"
                placeholder="Recipe Name"
                name="recipeName"
                aria-required="true"
                maxLength={100}
                value={recipeName}
                onChange={e => changeRecipeName(e)} />
        </Form.Group>
    );
}

export default RecipeName;