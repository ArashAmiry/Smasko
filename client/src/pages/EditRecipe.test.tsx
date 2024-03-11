import EditRecipe from "./EditRecipe";
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import { Recipe } from "../components/Recipe/Recipe";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

test('Editing a recipe should call a put request to the server', async () => {

    const route = '/recipe/123';

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
        steps: [],
        rating: 2,
        like: false
    };
    mockedAxios.get.mockResolvedValue({ status: 200, data: mockRecipe });
    mockedAxios.put.mockResolvedValue({ status: 200, data: mockRecipe });

    await act(async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/recipe/:id" element={<EditRecipe />} />
                </Routes>
            </MemoryRouter>);
    });

    await act(async () => {
        fireEvent.click(screen.getByTestId('save-button'));
      });
    


    expect(mockedAxios.put).toHaveBeenCalled();
})