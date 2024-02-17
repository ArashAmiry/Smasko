import { render, fireEvent, screen } from '@testing-library/react';
import RecipeCard from './RecipeCard';

  const mockProps = {
    name: 'Test Recipe',
    img: 'test.jpg',
    id: '123',
    showIngredients: jest.fn(),
  };

  test('RecipeCard should show its name on screen', () => {
    render(<RecipeCard {...mockProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  test('Pressing see ingredients button should call showIngredients method', () => {
    render(<RecipeCard {...mockProps} />);
    fireEvent.click(screen.getByText('See ingredients'));
    expect(mockProps.showIngredients).toHaveBeenCalledWith(123);
  });
