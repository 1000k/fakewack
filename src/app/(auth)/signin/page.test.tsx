import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';

test('renders Sign In page', () => {
  render(<Page />);

  // Check if the heading is present
  const heading = screen.getByRole('heading', { name: /fakewack/i });
  expect(heading).toBeDefined();
});
