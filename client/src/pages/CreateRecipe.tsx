import { FormEvent, useEffect, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import RecipeSteps from "../components/Recipe/RecipeSteps";
import RecipeIngredients from "../components/Recipe/RecipeIngredients";
import "./createRecipe.css";
import RecipeName from "../components/Recipe/RecipeName";
import { useNavigate } from "react-router-dom";
import { Ingredient } from "../components/Recipe/Ingredient";
import { Rating } from "react-simple-star-rating";
import ImageUpload from "../components/Recipe/ImageUpload";

function CreateRecipe() {
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([{ name: "", amount: 1, unit: "st" }]);
    const [stepsList, setStepsList] = useState<string[]>([""]);
    const [recipeName, setRecipeName] = useState("");
    const [imageBase64, setImageBase64] = useState('');
    const [numServings, setNumServings] = useState(4);
    const [shakeScreen, setShakeScreen] = useState(false);
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({ recipeName: "", ingredients: "", steps: "", image: "" });
    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const result = reader.result;
            if (typeof result === 'string' || result instanceof ArrayBuffer) {
                setImageBase64(result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleRating = (rate: number) => {
        setRating(rate)
    }

    useEffect(() => {
        let timeout: any;
        if (shakeScreen) {
            timeout = setTimeout(() => {
                setShakeScreen(false);
            }, 500); // Adjust the duration based on the animation duration
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

        // If there are any errors, prevent form submission
        if (!Object.values(newErrors).every(val => val === "")) { 
            return;
        }

        // Submit the recipe data to the backend if validation passes
        await axios.post('http://localhost:8080/recipe', {
            "name": recipeName,
            "image": imageBase64,
            "numberServings": numServings,
            "ingredients": ingredientsList,
            "steps": stepsList,
            "rating": rating
        }, { timeout: 10000 })
            .then(function (response) {
                console.log(response.data);
                navigate("/recipe/" + response.data._id); // Navigate to the newly created recipe page
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

            <ImageUpload image={imageBase64} setImage={(e) => setImageBase64(e)}/>

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

            <Rating onClick={(rating) => handleRating(rating)} />

            <Button data-testid="submit-button" variant="success" type="submit" className="submit-button" size="lg">
                Submit
            </Button>
        </Form>
    );
}

export default CreateRecipe;