import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';
import orderService from './services/orderService';
import '@testing-library/jest-dom';

jest.mock('./services/orderService');

describe('App', () => {
  it('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeVisible();
  });

  it('renders the form and list after data is fetched', async () => {
    const mockCoffeeInfo = {
      data: [
        { store_name: "Store 1", coffee_type: "Coffee 1", cost: 10 },
        { store_name: "Store 2", coffee_type: "Coffee 2", cost: 20 },
      ]
    };
    const mockOrders = {
      data: [
        { id: 1, user_name: 'Test User', store_name: 'Test Store', coffee_type: 'Test Coffee', amount: 1, total: 10 },
      ]
    };
    orderService.getCoffeeInfo.mockResolvedValue(mockCoffeeInfo);
    orderService.getAllOrders.mockResolvedValue(mockOrders);

    await act(async () => {
      render(<App />);
    });

    // Locate the "Place Order" button within the form to confirm the form’s presence
    expect(screen.getByText('Place Order')).toBeVisible();
    expect(screen.getByRole('table')).toBeVisible();
  });

  it('renders error message if data fetching fails', async () => {
    const error = new Error('Failed to fetch');
    orderService.getCoffeeInfo.mockRejectedValue(error);
    orderService.getAllOrders.mockRejectedValue(error);

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText(`Error: ${error.message}`)).toBeVisible();
  });
});
