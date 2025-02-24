import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header from '../src/components/Header';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    canGoBack: () => true,
    goBack: jest.fn(),
  }),
}));

describe('Header Component', () => {
  it('renders the title correctly', () => {
    const {getByText} = render(<Header title="Test Header" />);
    expect(getByText('Test Header')).toBeTruthy();
  });

  it('calls navigation.goBack when back button is pressed', () => {
    const onBackPressMock = jest.fn();
    const {getByTestId} = render(
      <Header title="Header" onBackPress={onBackPressMock} />,
    );
    fireEvent.press(getByTestId('header-back-button'));
    expect(onBackPressMock).toHaveBeenCalledTimes(1);
  });
});
