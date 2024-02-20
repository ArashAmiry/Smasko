import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import RecipeSteps from "./components/Recipe/RecipeSteps";
import RecipeIngredients from "./components/Recipe/RecipeIngredients";
import "./createRecipe.css";
import RecipeName from "./components/Recipe/RecipeName";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecipe } from "./FetchRecipe";

export type Ingredient = {
    name: string;
    amount: number;
    unit: string;
};

interface Recipe {
    id: number;
    name: string;
    imagePath: string;
    numberServings: number;
    ingredients: { name: string, amount: number, unit: string }[];
    steps: string[];
}

function EditRecipe() {
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([{ name: "", amount: 0, unit: "st" }]);
    const [stepsList, setStepsList] = useState<string[]>([""]);
    const [recipeName, setRecipeName] = useState("");
    const [imgPath, setImgPath] = useState("");
    const [numServings, setNumServings] = useState(2);

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    async function updateData(recipe : Recipe) {
        setImgPath(recipe.imagePath);
        setIngredientsList(recipe.ingredients);
        setNumServings(recipe.numberServings);
        setRecipeName(recipe.name);
        setStepsList(recipe.steps);
    }

    useEffect(() => {
        const fetchData = async() => {
            if (id) {
                const recipe = await fetchRecipe(id);
                if (recipe) {
                    setRecipe(recipe);
                    updateData(recipe);
                }
            } 
        }

        fetchData();
    }, [id]);
    
    

    async function submitRecipe(e: FormEvent) {
        console.log("submit");
        e.preventDefault();

        if (id === undefined) {
            console.log("ID is undefined");
            return;
        }

        await axios.put(`http://localhost:8080/recipe/${id}`, {
            "id": parseInt(id),
            "name": recipeName,
            "imagePath": "hej",
            "numberServings": numServings,
            "ingredients": ingredientsList,
            "steps": stepsList
        }, { timeout: 10000 })
            .then(function (response) {
                console.log(response);
            })
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

            <Form.Group className="image-input my-3 p-4">
                <Form.Label> Choose an image for the recipe</Form.Label>
                <Form.Control type="file" lang="en" />
            </Form.Group>

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

            <Button variant="success" type="submit" className="submit-button" size="lg">
                Save
            </Button>
        </Form>
    );
}


export default EditRecipe;
