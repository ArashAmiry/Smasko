import { render, fireEvent, screen, act, getByLabelText, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import axios, { AxiosStatic } from 'axios';
import 'core-js';
import { Recipe } from '../components/Recipe/Recipe';
import { fetchRecipe } from './FetchRecipe';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<any>;

const mockRecipe: Recipe =
{
    _id: "123",
    name: "Recipe1",
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
};

test('test', async () => {
    mockedAxios.get.mockResolvedValue({ status: 200, data: mockRecipe });

    await act(async () => {
        render(

            <MemoryRouter initialEntries={['/recipe/123']}> 
                <Routes>
                    <Route path="/recipe/:id" element={<RecipeDetails/>} />
                </Routes>
            </MemoryRouter>
        )
    });

     expect(screen.getByText(mockRecipe.name)).toBeInTheDocument();
     expect(screen.getByText(mockRecipe.numberServings)).toBeInTheDocument();
     expect(screen.getByText(/1 st ingredient1/i)).toBeInTheDocument();
     expect(screen.getByText(/2 dl ingredient2/i)).toBeInTheDocument();
});
