import { Ingredient } from "../../CreateRecipe";
import IngredientRow from "./IngredientRow";


export interface IngredientsListProps {
    ingredientsList: Array<Ingredient>; // Assuming Ingredient is another interface or type
    deleteIngredient: (index: number) => void;
    changeName: (name: string, index: number) => void;
    changeAmount: (amount: number, index: number) => void;
    changeUnit: (unit: string, index: number) => void;
}

function IngredientsList({ ingredientsList, deleteIngredient, changeName, changeAmount, changeUnit }: IngredientsListProps) {
    return (
        <>
            {ingredientsList.map((singleIngredient, index) => (
                <IngredientRow
                    key={index}
                    ingredient={singleIngredient}
                    handleDelete={() => deleteIngredient(index)}
                    changeName={(name) => changeName(name, index)}
                    changeAmount={(amount) => changeAmount(amount, index)}
                    changeUnit={(unit) => changeUnit(unit, index)}
                    index={index}
                />
            ))}
        </>
    );
}

export default IngredientsList ;