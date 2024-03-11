import RecipePage from "./RecipePage";

function FavoriteRecipes() {
  return (
    <RecipePage
      path={"recipe/favorites"}
      noRecipesMessage="Are the recipes really that bad, or did your favorites list decide to go on vacation?"
    />
  );
}

export default FavoriteRecipes;
