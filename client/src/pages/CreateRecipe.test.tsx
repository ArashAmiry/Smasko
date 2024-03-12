import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import { Recipe } from "../components/Recipe/Recipe";
import { MemoryRouter } from "react-router-dom";
import CreateRecipe from "./CreateRecipe";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

test('Creating a recipe should make a post call.', async () => {
    const mockRecipe: Recipe =
    {
        _id: "123",
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
        steps: ["Prepare ingredients"],
        rating: 2,
        like: false
    };

    mockedAxios.post.mockResolvedValue({ status: 201, data: mockRecipe });

    await act(async () => {
        render(
            <MemoryRouter>
                <CreateRecipe/>
            </MemoryRouter>);
    });

    const recipeName = screen.getByPlaceholderText("Recipe Name");
    fireEvent.change(recipeName, { target: { value: mockRecipe.name } });

    const ingredient = screen.getByPlaceholderText("Ingredient");
    fireEvent.change(ingredient, { target: { value: mockRecipe.ingredients[0] } });

    const amount = screen.getByPlaceholderText("Amount");
    fireEvent.change(amount, { target: { value: mockRecipe.ingredients[0].amount } });

    const step = screen.getByPlaceholderText("Step 1");
    fireEvent.change(step, { target: { value: mockRecipe.steps[0] } });

    await act(async () => {
        fireEvent.click(screen.getByTestId('submit-button'));
      });
    
    expect(mockedAxios.post).toHaveBeenCalled();
})

test('Creating a incomplete recipe should not call post.', async () => {
    const mockRecipe: Recipe =
    {
        _id: "123",
        name: "testrecipe",
        image: "2qwerty4ty",
        numberServings: 2,
        ingredients: [
            {
                name: 'ingredient1',
                amount: 1,
                unit: 'st'
            }
        ],
        steps: [],
        rating: 2,
        like: false
    };

    mockedAxios.post.mockResolvedValue({ status: 201, data: mockRecipe });

    await act(async () => {
        render(
            <MemoryRouter>
                <CreateRecipe/>
            </MemoryRouter>);
    });

    const recipeName = screen.getByPlaceholderText("Recipe Name");
    fireEvent.change(recipeName, { target: { value: mockRecipe.name } });

    await act(async () => {
        fireEvent.click(screen.getByTestId('submit-button'));
      });
    
    expect(mockedAxios.post).not.toHaveBeenCalled();
})