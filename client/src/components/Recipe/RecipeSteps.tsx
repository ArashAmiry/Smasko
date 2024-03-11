import { Container, Button } from "react-bootstrap";
import StepRow from "./StepsRow";
import { ChangeEvent } from "react";
import Form from "react-bootstrap/esm/Form";
import Col from "react-bootstrap/esm/Col";
import './createRecipeSections.css';

interface StepsProps {
    stepsList: Array<string>;
    setStepsList: (stepsList: string[]) => void;
}

const RecipeSteps = ({ stepsList, setStepsList }: StepsProps) => {

    // Adds a new step with an empty string to the steps list.
    const addStep = () => {
        setStepsList([...stepsList, ""]);
    }

     // Deletes a step from the steps list at the specified index.
    const deleteStep = (index: number) => {
        const list = [...stepsList];
        list.splice(index, 1);
        setStepsList(list);
    }

    // Handles the event of changing a step's text at the specified index.
    const handleChangeStep = (e: ChangeEvent, index: number) => {
        const { value } = e.target as HTMLInputElement;
        const list = [...stepsList];
        list[index] = value;
        setStepsList(list);
    }

    return (
        <Form.Group as={Col} sm className="section justify-content-center mt-3 rounded-4 bg-light shadow-sm p-4">
            <h2>Steps</h2>

            <Container className="p-0">
                {stepsList.map((singleStep, index) => (
                    <StepRow
                        key={index}
                        step={singleStep}
                        handleDelete={() => deleteStep(index)}
                        handleChange={(e) => handleChangeStep(e, index)}
                        index={index}
                    />
                ))}
            </Container>

            <Button variant="outline-secondary" className="btn-outline-secondary mt-3" onClick={() => addStep()}>
                Add new step
            </Button>
        </Form.Group>
    );
}

export default RecipeSteps;