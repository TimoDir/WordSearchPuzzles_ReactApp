import { render, screen, } from '@testing-library/react';
import App from './App';

describe('MainSection Component', () => {
  test('render', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })
});