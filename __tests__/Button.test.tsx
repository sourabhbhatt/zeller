import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../src/components/Button';

describe('Button Component', () => {
  it('renders with correct title', () => {
    const { getByText } = render(<Button title="Click Me" onPress={() => {}} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Press Me" onPress={onPressMock} />);
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when loading is true', () => {
    // Ensure your Button component passes a testID to the ActivityIndicator
    const { getByTestId } = render(<Button title="Loading" onPress={() => {}} loading />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders a right icon when rightIcon prop is provided', () => {
    // Ensure your Button component adds a testID to the Icon when rendered
    const { getByTestId } = render(
      <Button title="Next" onPress={() => {}} rightIcon="arrow-right" />
    );
    expect(getByTestId('button-right-icon')).toBeTruthy();
  });
});