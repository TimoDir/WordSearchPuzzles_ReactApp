import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header and is h1 element', () => {
  render(<App />);
  const header = screen.getByText(/Search Words Generator/i);
  expect(header).toBeInTheDocument();
});
