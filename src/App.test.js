import { render, screen } from '@testing-library/react';
import App from './App';

test('login', () => {
  render(<App />);
  const LabelEmail = screen.getByText(/Email:/i);
  expect(LabelEmail).toBeInTheDocument();
});
