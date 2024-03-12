import { render, screen, act } from '@testing-library/react';
import DisplayRecipes from './DisplayRecipes';
import axios, { AxiosStatic } from 'axios';
import { Recipe } from './Recipe';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

const mockRecipes: Recipe[] = [
{
    _id: "67890",
    name: "testrecipe",
    image: "2qwerty4ty",
    numberServings: 2,
    ingredients: [
        {
            name: 'ingredient1',
            amount: 1,
            unit: 'st'
        }, 
        {
            name: 'ingredient2',
            amount: 2,
            unit: 'dl'
        }
    ],
    steps: [],
    rating: 2,
    like: false
},
{
    _id: "67840",
    name: "something",
    image: "1qwerty4ty",
    numberServings: 3,
    ingredients: [
        {
            name: 'ingredient1',
            amount: 1,
            unit: 'st'
        }, 
        {
            name: 'ingredient2',
            amount: 2,
            unit: 'dl'
        }
    ],
    steps: [],
    rating: 2,
    like: false
}];

test('DisplayRecipe should filter recipes based on searchterm.', async () => {
    const showIngredients = jest.fn();
    mockedAxios.get.mockResolvedValue({status: 200, data: mockRecipes });

    await act(async () => {
        render(
            <MemoryRouter>
                <DisplayRecipes searchTerm={'testrecipe'} path={'recipe'} showIngredients={() => showIngredients()} noRecipesMessage={'No Recipes'}/>
            </MemoryRouter>);
    });

    const recipe = screen.getByText("testrecipe");
    const noexistingrecipe = screen.queryByText("something");

    expect(recipe).toBeInTheDocument();
    expect(noexistingrecipe).not.toBeInTheDocument();
});

test('DisplayRecipe with no recipes should display no recipes.', async () => {
    const showIngredients = jest.fn();
    const emptyRecipes: Recipe[] = [];
    mockedAxios.get.mockResolvedValue({status: 200, data: emptyRecipes });

    await act(async () => {
        render(
            <MemoryRouter>
                <DisplayRecipes searchTerm={'testrecipe'} path={'recipe'} showIngredients={() => showIngredients()} noRecipesMessage={'No recipes found.'}/>
            </MemoryRouter>);
    });

    const noRecipesText = screen.getByText("No recipes found.");

    expect(noRecipesText).toBeInTheDocument();
});
