import { Recipe } from "./RecipeDetails";

function SearchBar({ searchInput, setSearchInput, recipes, setRecipes }:
    { searchInput: string, setSearchInput: (input: string) => void, recipes: string, setRecipes: (recipe: Recipe) => void }) {

    return (
        <div>
            <input type="text" placeholder="Search here" value={searchInput}></input>
        </div>
    );
}