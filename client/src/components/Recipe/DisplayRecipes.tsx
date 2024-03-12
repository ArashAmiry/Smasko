import { useEffect, useState } from "react";
import axios from "axios";
import { Recipe } from "./Recipe";
import RecipeCardList from "./RecipeCardList";
import ClockLoader from "react-spinners/ClockLoader";
import { Container, Row } from "react-bootstrap";

function DisplayRecipes({
  searchTerm,
  path,
  showIngredients,
  noRecipesMessage,
}: {
  searchTerm: string;
  path: string;
  showIngredients: (id: string) => void;
  noRecipesMessage: string;
}) {
  // State to store the list of recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch all the recipes 
  async function getRecipes() {
    await axios
      .get<Recipe[]>(`http://localhost:8080/${path}`)
      .then(function (response) {
        const newRecipes: Recipe[] = response.data;
        setRecipes(newRecipes);
        setFilteredRecipes(newRecipes);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }

  // Function to filter the recipes from the server
  async function filterRecipes() {
    console.log(recipes)
    const filteredRecipes = recipes.filter((recipe) =>
          recipe.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredRecipes(filteredRecipes);
  }

  // Fetches all the recipes when the page loads
  useEffect(() => {
    getRecipes();
  }, []);

  // Filters recipes upon changed searchTerm
  useEffect(() => {
    filterRecipes();
  }, [searchTerm]);

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <ClockLoader />
        </div>
      )}
      {!isLoading && recipes.length > 0 && (
        <RecipeCardList
          recipes={filteredRecipes}
          showIngredients={(id) => showIngredients(id)}
        ></RecipeCardList>
      )}
      {!isLoading && recipes.length === 0 && (
        <Container>
          <Row className="my-4">
            <h1>
              {noRecipesMessage}
            </h1>
          </Row>
        </Container>
      )}
    </>
  );
}

export default DisplayRecipes;
