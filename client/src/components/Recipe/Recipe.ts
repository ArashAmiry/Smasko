export interface Recipe {
    id: number;
    name: string;
    imagePath: string;
    numberServings: number;
    ingredients: { name: string, amount: number, unit: string }[];
    steps: string[];
    rating: number;
}