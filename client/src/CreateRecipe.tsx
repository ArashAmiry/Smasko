import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import IngredientRow from "./components/Recipe/IngredientRow";
import StepRow from "./components/Recipe/StepsRow";
import Form from "react-bootstrap/esm/Form";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import RecipeSteps from "./components/Recipe/RecipeSteps";
import IngredientsList from "./components/Recipe/IngredientsList";
import RecipeIngredients from "./components/Recipe/RecipeIngredients";
import "./createRecipe.css";
import RecipeName from "./components/Recipe/RecipeName";
import { useNavigate } from "react-router-dom";
import { Recipe } from "./RecipeDetails";
import { Ingredient } from "./components/Recipe/Ingredient";

function CreateRecipe() {
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([{ name: "", amount: 0, unit: "st" }]);
    const [stepsList, setStepsList] = useState<string[]>([""]);
    const [recipeName, setRecipeName] = useState("");
    const [imgPath, setImgPath] = useState("");
    const [numServings, setNumServings] = useState(4);
    const [shakeScreen, setShakeScreen] = useState(false);
    const [image, setImage] = useState<string>("");
    const [errors, setErrors] = useState({ recipeName: "", ingredients: "", steps: "", image: "" }); 
    const navigate = useNavigate();
    
    function handleImageChange(e : React.ChangeEvent) {
        const inputElement = e.target as HTMLInputElement;
        if (inputElement.files) {
            const file = inputElement.files[0];
            setImage(URL.createObjectURL(file));
        }
    }
    
    useEffect(() => {
        let timeout: any;
        if (shakeScreen) {
            timeout = setTimeout(() => {
                setShakeScreen(false);
            }, 500); // Adjust the duration based on your animation duration
        }
        return () => clearTimeout(timeout);
    }, [shakeScreen]);


    async function submitRecipe(e: FormEvent) {
        e.preventDefault();

        let newErrors = { recipeName: "", ingredients: "", steps: "", image: "" };

        if (!recipeName.trim()) {
            setShakeScreen(true);
            newErrors.recipeName = "Please enter a recipe name";
        }
    
        if (ingredientsList.some(ingredient => !ingredient.name.trim())) {
            setShakeScreen(true);   
            newErrors.ingredients = "Please enter valid ingredients";
        }

        if (ingredientsList.some(ingredient => !(ingredient.amount > 0))) {
            setShakeScreen(true);
            newErrors.ingredients = "Please enter valid ingredients";
        }
    
        if (stepsList.some(step => !step.trim())) {
            setShakeScreen(true);
            newErrors.steps = "Please enter valid steps";
        }

        setErrors(newErrors);

        if (!Object.values(newErrors).every(val => val === "")) { 
            return;
        }

        await axios.post('http://localhost:8080/recipe', {
            "name": recipeName,
            "imagePath": "hej",
            "numberServings": numServings,
            "ingredients": ingredientsList,
            "steps": stepsList
        }, { timeout: 10000 })
            .then(function (response) {
                console.log(response);
                navigate("/recipe/" + response.data.id);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Form className="container m-2 mx-auto create-recipe-container" onSubmit={e => submitRecipe(e)} style={shakeScreen ? { animation: 'shake 0.5s ease-in-out' } : {}}>
            <RecipeName
                recipeName={recipeName}
                setRecipeName={(recipeName) => setRecipeName(recipeName)}
            />
            {errors.recipeName && <p className="error-message">{errors.recipeName}</p>}

            <Form.Group className="image-input my-3 p-4">
                <Form.Label> Choose an image for the recipe</Form.Label>
                {image && (
                <div className="mt-3">
                    <img src={image} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                 )}
                <Form.Control type="file" lang="en" onChange={(e) => handleImageChange(e)} />
            </Form.Group>

            <RecipeIngredients
                ingredientsList={ingredientsList}
                setIngredientsList={(ingredientsList) => setIngredientsList(ingredientsList)}
                numServings={numServings}
                setNumServings={(numServings) => setNumServings(numServings)}
            />
            {errors.ingredients && <p className="error-message">{errors.ingredients}</p>}

            <RecipeSteps
                stepsList={stepsList}
                setStepsList={(stepsList) => setStepsList(stepsList)}
            />
            {errors.steps && <p className="error-message">{errors.steps}</p>}


            <Button data-testid="submit-button" variant="success" type="submit" className="submit-button" size="lg">
                Submit
            </Button>
        </Form>
    );
}


export default CreateRecipe;
