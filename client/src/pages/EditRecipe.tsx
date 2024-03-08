import { FormEvent, useEffect, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import RecipeSteps from "../components/Recipe/RecipeSteps";
import RecipeIngredients from "../components/Recipe/RecipeIngredients";
import "./createRecipe.css";
import RecipeName from "../components/Recipe/RecipeName";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecipe } from "./FetchRecipe";
import { Recipe } from "../components/Recipe/Recipe";
import { Rating } from "react-simple-star-rating";
import ImageUpload from "../components/Recipe/ImageUpload";
import { Ingredient } from "../components/Recipe/Ingredient";

function EditRecipe() {
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([{ name: "", amount: 0, unit: "st" }]);
    const [stepsList, setStepsList] = useState<string[]>([""]);
    const [recipeName, setRecipeName] = useState("");
    const [imageBase64, setImageBase64] = useState("");
    const [numServings, setNumServings] = useState(2);
    const [rating, setRating] = useState(0);

    // Hooks to access URL parameters 
    const { id } = useParams();
    const navigate = useNavigate();

    // Function to update component state with fetched recipe data
    async function updateData(recipe : Recipe) {
        setImageBase64(recipe.image);
        setIngredientsList(recipe.ingredients);
        setNumServings(recipe.numberServings);
        setRecipeName(recipe.name);
        setStepsList(recipe.steps);
        setRating(recipe.rating);
    }

    const handleRating = (rate: number) => {
        setRating(rate);
    }

    // useEffect to fetch recipe details when the component is rendered at the beginning or the ID changes
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const recipe = await fetchRecipe(id);
                if (recipe) {
                    updateData(recipe);
                }
            }
        }

        fetchData();
    }, [id]);

    // Function to submit the edited recipe data
    async function submitRecipe(e: FormEvent) {
        e.preventDefault();

        if (id === undefined) {
            console.log("ID is undefined");
            return;
        }

        await axios.put(`http://localhost:8080/recipe/${id}`, {
            "_id": id,
            "name": recipeName,
            "image": imageBase64,
            "numberServings": numServings,
            "ingredients": ingredientsList,
            "steps": stepsList,
            "rating": rating
        }, { timeout: 10000 })
            .catch(function (error) {
                console.log(error);
            });
        navigate(`/recipe/${id}`)
    }

    return (
        <Form className="container m-2 mx-auto create-recipe-container" onSubmit={e => submitRecipe(e)}>
            <RecipeName
                recipeName={recipeName}
                setRecipeName={(recipeName) => setRecipeName(recipeName)}
            />

            <ImageUpload image={imageBase64} setImage={(e) => setImageBase64(e)}/>

            <RecipeIngredients
                ingredientsList={ingredientsList}
                setIngredientsList={(ingredientsList) => setIngredientsList(ingredientsList)}
                numServings={numServings}
                setNumServings={(numServings) => setNumServings(numServings)}
            />

            <RecipeSteps
                stepsList={stepsList}
                setStepsList={(stepsList) => setStepsList(stepsList)}
            />

            <Rating initialValue={rating} onClick={(e) => handleRating(e)} />

            <Button variant="success" type="submit" className="submit-button" size="lg">
                Save
            </Button>
        </Form>
    );
}

export default EditRecipe;