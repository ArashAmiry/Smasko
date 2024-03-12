import { render, fireEvent, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios, { AxiosStatic } from 'axios';
import { Recipe } from '../components/Recipe/Recipe';
import RecipePage from './RecipePage';

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
}];

test('Pressing See Ingredients should display the list of ingredients.', async () => {
    mockedAxios.get
    .mockResolvedValueOnce({status: 200, data: mockRecipes })
    .mockResolvedValueOnce({status: 200, data: mockRecipes[0] });
    
    await act(async () => {
        const { debug } = render(
            <MemoryRouter>
                <RecipePage path={'recipe'} noRecipesMessage={'No recipes found'}/>
            </MemoryRouter>);

            debug();
    });

    const button = screen.getByText("See ingredients");
    await act(async () => {
        fireEvent.click(button);
    });
 
    expect(screen.getByText("Number of servings: 2")).toBeInTheDocument();
    expect(screen.getByText("1 st ingredient1")).toBeInTheDocument();
    expect(screen.getByText("2 dl ingredient2")).toBeInTheDocument();
});