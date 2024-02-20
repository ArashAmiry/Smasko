import { render, fireEvent, screen } from '@testing-library/react';
import IngredientRow from './IngredientRow';

const mockProps = {
    ingredient: {
        name: 'Garlic',
        amount: 3,
        unit: 'st'
    },
    handleDelete: jest.fn(),
    changeName: jest.fn(),
    changeAmount: jest.fn(),
    changeUnit: jest.fn(),
    index: 0
  };

test('IngredientRow should appear on the screen with correct values', () => {
    render(<IngredientRow {...mockProps} />);
    expect(screen.getByDisplayValue(mockProps.ingredient.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockProps.ingredient.amount)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockProps.ingredient.unit)).toBeInTheDocument();
  });

test('Pressing delete button should call handleDelete on correct index', () => {
    render(<IngredientRow {...mockProps} />);

    fireEvent.click(screen.getByTestId('delete-button'));

    expect(mockProps.handleDelete).toHaveBeenCalledWith(mockProps.index);
});

test('Changing the name input field should trigger a change event with the correct input', () => {
    render(<IngredientRow {...mockProps} />);

    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Tomato' }});

    expect(mockProps.changeName).toHaveBeenCalledTimes(1);
    expect(mockProps.changeName).toHaveBeenCalledWith('Tomato');
});

test('Changing the amount input field should trigger a change event with the correct input', () => {
    render(<IngredientRow {...mockProps} />);

    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '5' }});

    expect(mockProps.changeAmount).toHaveBeenCalledTimes(1);
    expect(mockProps.changeAmount).toHaveBeenCalledWith(5);
});

test('Changing the unit input should trigger a change event with the correct input', () => {
    render(<IngredientRow {...mockProps} />);

    fireEvent.change(screen.getByTestId('unit-input'), { target: { value: 'l' }});

    expect(mockProps.changeUnit).toHaveBeenCalledTimes(1);
    expect(mockProps.changeUnit).toHaveBeenCalledWith("l");
});
