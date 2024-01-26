export interface Recipe {
    id : number;
    name : string;
    imagePath : string;
    numberServings : number;
    ingredients : [string, number][];
    steps : string[];
}