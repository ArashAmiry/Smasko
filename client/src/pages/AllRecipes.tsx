import RecipePage from "./RecipePage";

function AllRecipes() {
  return (
    <RecipePage
      path={"recipe"}
      noRecipesMessage="Yikes! Your recipe shelf is looking a bit empty!
        Time to sprinkle some culinary magic and start adding your favorite recipes!"
    />
  );
}

export default AllRecipes;
