import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  const { getAllByText } = render(<App />);
  const titleElement = getAllByText(/borrow-ui/i);
  expect(titleElement[0]).toBeInTheDocument();
});
