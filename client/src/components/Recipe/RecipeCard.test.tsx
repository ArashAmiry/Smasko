import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import RecipeCard from './RecipeCard';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<AxiosStatic>;

  const mockProps = {
    name: 'Test Recipe',
    img: 'test.jpg',
    rating: 5,
    id: '123',
    like: true,
    showIngredients: jest.fn(),
  };

test('RecipeCard should show its name on screen', () => {
  render(<RecipeCard {...mockProps} />);
  expect(screen.getByText(mockProps.name)).toBeInTheDocument();
});

test('Pressing see ingredients button should call showIngredients method', () => {
  render(<RecipeCard {...mockProps} />);
  fireEvent.click(screen.getByText('See ingredients'));
  expect(mockProps.showIngredients).toHaveBeenCalledWith("123");
});

test('Pressing the like button should make a patch call', async () => {
  mockedAxios.patch.mockResolvedValue({status: 200, data: mockProps });

  await act(async () => {

    render(<RecipeCard {...mockProps} />);
  });

  const heartButton = screen.getByTestId('heartButton');

  await act(async () => {
    fireEvent.click(heartButton);
  });

  expect(mockedAxios.patch).toHaveBeenCalled();
});