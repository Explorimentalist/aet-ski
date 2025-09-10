// src/components/ReviewForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewForm } from './ReviewForm';

describe('ReviewForm', () => {
  it('renders rating, inputs, and hidden booking name field', () => {
    render(<ReviewForm onSubmit={jest.fn()} initialBookingName="Lead Passenger" />);

    // Rating group with 5 radios
    const group = screen.getByRole('radiogroup', { name: /rating/i });
    expect(group).toBeInTheDocument();
    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(5);

    // Inputs
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your review/i)).toBeInTheDocument();

    // Hidden booking name
    const hidden = screen.getByTestId('booking-name-hidden') as HTMLInputElement;
    expect(hidden).toBeInTheDocument();
    expect(hidden.value).toBe('Lead Passenger');
  });

  it('shows validation errors on submit when fields are empty', () => {
    render(<ReviewForm onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /submit review/i }));

    expect(screen.getByText(/please select a rating/i)).toBeInTheDocument();
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/your review is required/i)).toBeInTheDocument();
  });

  it('submits valid data', () => {
    const onSubmit = jest.fn();
    render(<ReviewForm onSubmit={onSubmit} />);

    // Set rating to 4
    fireEvent.click(screen.getByRole('radio', { name: /4 stars/i }));

    // Fill name and comment
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/your review/i), { target: { value: 'Great service! Very punctual and friendly.' } });

    fireEvent.click(screen.getByRole('button', { name: /submit review/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ rating: 4, name: 'Jane Doe', comment: expect.stringContaining('Great service') })
    );
  });
});
