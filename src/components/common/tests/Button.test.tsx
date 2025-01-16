import { fireEvent, render, screen } from '@testing-library/react';

import Button from '../Button';

describe('Button Component', () => {
  it('renders the button correctly', () => {
    render(<Button onClick={jest.fn}>Click Me</Button>);
  });

  it('calls the onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
