export interface Recipe {
    _id: string;
    name: string;
    image: string;
    numberServings: number;
    ingredients: { name: string, amount: number, unit: string }[];
    steps: string[];
    rating: number;
    like: boolean;
}