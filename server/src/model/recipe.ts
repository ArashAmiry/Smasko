export interface Recipe {
    id : number;
    name : string;
    imagePath : string;
    numberServings : number;
    ingredients : [string, number][];
    steps : string[];
}


export function validateRecipe(obj: any): string {
    if (typeof obj !== 'object') {
        return 'input is not an object';
    }

    if (typeof obj.name !== 'string') {
        return 'mame must be a string';
    }

    if (typeof obj.imagePath !== 'string') {
        return 'imagePath must be a string';
    }

    if (typeof obj.numberServings !== 'number') {
        return 'mumberServings must be a number';
    }

    if (!Array.isArray(obj.ingredients) || !obj.ingredients.every(
        (ingredient: [string, number]) =>
            Array.isArray(ingredient) &&
            ingredient.length === 2 &&
            typeof ingredient[0] === 'string' &&
            typeof ingredient[1] === 'number'
    )) {
        return 'ingredients must be an array of [string, number] tuples';
    }

    if (!Array.isArray(obj.steps) || !obj.steps.every((step: string) => typeof step === 'string')) {
        return 'steps must be an array of strings';
    }

    return '';
}
