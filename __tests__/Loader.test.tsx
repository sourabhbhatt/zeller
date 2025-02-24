import React from 'react';
import {render} from '@testing-library/react-native';
import Loader from '../src/components/Loader';

describe('Loader Component', () => {
  it('renders nothing when visible is false', () => {
    const {queryByTestId} = render(<Loader visible={false} />);
    expect(queryByTestId('activity-indicator')).toBeNull();
  });

  it('renders ActivityIndicator when visible is true', () => {
    const {getByTestId} = render(<Loader visible={true} overlay />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders a message if provided', () => {
    const message = 'Loading data...';
    const {getByText} = render(
      <Loader visible={true} overlay message={message} />,
    );
    expect(getByText(message)).toBeTruthy();
  });
});
