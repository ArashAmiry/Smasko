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
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch and filter the recipes from the server
  async function filterRecipes() {
    await axios
      .get<Recipe[]>(`http://localhost:8080/${path}`)
      .then(function (response) {
        const newRecipes: Recipe[] = response.data;

        // Filter recipes based on the searchTerm prop to implement search functionality
        const filteredRecipes = newRecipes.filter((recipe) =>
          recipe.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setRecipes(filteredRecipes);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }

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
          recipes={recipes}
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
