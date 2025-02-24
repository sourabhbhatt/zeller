import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

jest.mock('../src/graphql/apolloClient', () => ({
  default: {
    query: jest.fn(),
    mutate: jest.fn(),
  },
}));

jest.mock('../src/navigation/AppNavigator', () => jest.fn(() => <></>));

jest.mock('../src/components/ErrorBoundary', () =>
  jest.fn(({children}) => children),
);

describe('App Component', () => {
  it('renders without crashing', () => {
    const {toJSON} = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});
