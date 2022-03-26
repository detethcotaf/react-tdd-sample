import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders the heading', () => {
    render(<Recipes />);

    expect(screen.getByRole('heading')).toHaveTextContent('Recipe Finder');
});