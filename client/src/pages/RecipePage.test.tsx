import { render, fireEvent, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios, { AxiosStatic } from 'axios';
import { Recipe } from '../components/Recipe/Recipe';
import RecipePage from './RecipePage';
import MockAdapter from 'axios-mock-adapter';

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


test('Test', async () => {
    var mock = new MockAdapter(axios);

    mockedAxios.get
    .mockResolvedValue({status: 200, data: mockRecipes });
    // .mockResolvedValueOnce({ status: 200, data: mockRecipes[0].ingredients });


    await act(async () => {
        render(
            <MemoryRouter>
                <RecipePage path={'recipe'}/>
            </MemoryRouter>);

        expect("testrecipe").toBeInTheDocument();

        
    });

    // const button = await screen.getByText("See ingredients");

    // await fireEvent.click(button);

    expect("testrecipe").toBeInTheDocument();

    // expect("Number of servings: 2").toBeInTheDocument();
});