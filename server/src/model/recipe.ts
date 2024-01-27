export interface Recipe {
    id : number;
    name : string;
    imagePath : string;
    numberServings : number;
    ingredients : [string, number][];
    steps : string[];
}

export function isRecipe(obj: any): obj is Recipe {
    return (
        typeof obj === 'object' &&
        typeof obj.id === 'number' &&
        typeof obj.name === 'string' &&
        typeof obj.imagePath === 'string' &&
        typeof obj.numberServings === 'number' &&
        Array.isArray(obj.ingredients) &&
        obj.ingredients.every(
            (ingredient: [string, number]) =>
                Array.isArray(ingredient) &&
                ingredient.length === 2 &&
                typeof ingredient[0] === 'string' &&
                typeof ingredient[1] === 'number'
        ) &&
        Array.isArray(obj.steps) &&
        obj.steps.every((step : string) => typeof step === 'string')
    );
}
