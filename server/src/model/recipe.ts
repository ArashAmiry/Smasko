export interface Recipe {
    _id : string,
    name : string,
    image : string,
    numberServings : number,
    ingredients : {name : string, amount : number, unit: string}[],
    steps : string[],
    rating : number,
    like : boolean
}


export function validateRecipe(obj: any): string {
    if (typeof obj !== 'object') {
        return 'input is not an object';
    }

    if (typeof obj.name !== 'string') {
        return 'name must be a string';
    }

    if ('image' in obj && !/^data:image\/\w+;base64,/.test(obj.image)) {
        return 'image must be a Base64 string';
    }

    if (typeof obj.numberServings !== 'number') {
        return 'numberServings must be a number';
    }

    if (!Array.isArray(obj.ingredients) || !obj.ingredients.every(
        (ingredient: {name : string, amount : number, unit: string}) =>
            Object.keys(ingredient).length === 3 &&
            typeof ingredient.name === 'string' &&
            typeof ingredient.amount === 'number' &&
            typeof ingredient.unit === 'string'
    )) {
        return 'ingredients must be an array of {string, number, string} objects';
    }

    if (!Array.isArray(obj.steps) || !obj.steps.every((step: string) => typeof step === 'string')) {
        return 'steps must be an array of strings';
    }

    return '';
}
