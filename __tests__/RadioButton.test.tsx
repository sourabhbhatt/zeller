import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RadioButton from '../src/components/RadioButton';

describe('RadioButton Component', () => {
  it('renders radio button with correct label', () => {
    const {getByText} = render(
      <RadioButton label="Admin" selected={false} onPress={() => {}} />,
    );
    expect(getByText('Admin')).toBeTruthy();
  });

  it('triggers onPress when clicked', () => {
    const mockOnPress = jest.fn();
    const {getByTestId} = render(
      <RadioButton label="Manager" selected={false} onPress={mockOnPress} />,
    );
    fireEvent.press(getByTestId('radio-button-Manager'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('shows correct selected state', () => {
    const {getByTestId} = render(
      <RadioButton label="Admin" selected={true} onPress={() => {}} />,
    );
    expect(getByTestId('radio-button-Admin')).toHaveProp('accessibilityState', {
      selected: true,
    });
  });

  it('shows if inner circle is selected', () => {
    const {getByTestId} = render(
      <RadioButton label="Manager" onPress={() => jest.fn()} selected={true} />,
    );
    expect(getByTestId('radio-inner-circle-Manager-true')).toBeTruthy();
  });
  
  it("does not show inner circle when unselected", () => {
    const { queryByTestId } = render(
      <RadioButton label="Admin" onPress={() => {}} selected={false} />
    );
    expect(queryByTestId("radio-inner-circle-Admin-true")).toBeNull(); // ✅ Ensure selected circle does not exist
    expect(queryByTestId("radio-inner-circle-Admin-false")).toBeNull(); // ✅ Should not exist either
  });
});
