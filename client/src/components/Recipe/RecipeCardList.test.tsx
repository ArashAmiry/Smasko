import { render, fireEvent, screen } from '@testing-library/react';
import RecipeCardList from './RecipeCardList';
import { Recipe } from './Recipe';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const mockRecipes: Recipe[] = [
    {
        _id: "12345",
        name: "test recipe",
        image: "1asdf3sdf",
        numberServings: 4,
        ingredients: [],
        steps: [],
        rating: 4,
        like: false
    },
    {
        _id: "67890",
        name: "Recipe 2",
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
    }
];

test('RecipeCardList should show display a list of RecipeCards', () => {
  render(<MemoryRouter><RecipeCardList recipes={mockRecipes} showIngredients={jest.fn()}/></MemoryRouter>);

  expect(screen.getByText(mockRecipes[0].name)).toBeInTheDocument();
  expect(screen.getByText(mockRecipes[1].name)).toBeInTheDocument();
});

  