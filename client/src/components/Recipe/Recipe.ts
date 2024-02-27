export interface Recipe {
    id: number;
    name: string;
    image: string;
    numberServings: number;
    ingredients: { name: string, amount: number, unit: string }[];
    steps: string[];
    rating: number;
}