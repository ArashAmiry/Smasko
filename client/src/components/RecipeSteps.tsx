import { Container, Button } from "react-bootstrap";
import StepRow from "./StepsRow";
import { ChangeEvent } from "react";
import Form from "react-bootstrap/esm/Form";

interface StepsProps {
    stepsList: Array<string>; 
    deleteStep: (index: number) => void;
    addStep: () => void;
    handleChangeStep: (e : ChangeEvent, index: number) => void;
}

const RecipeSteps = ({stepsList, deleteStep, addStep, handleChangeStep} : StepsProps) => {
    return (
        <Form.Group>
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
            <Button variant="primary" onClick={() => addStep()}>
                Add new step
            </Button>
        </Form.Group>);
}

export default RecipeSteps;