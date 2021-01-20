import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

import Search from '../index';

describe('<Search />', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should call onSearch with null as an arg when clear btn clicked', () => {
    const onSearch = jest.fn();

    act(() => {
      render(<Search onSearch={onSearch} value={''} />, container);
    });
    const clearButton = document.querySelector(
      '[data-testid=search-clear]',
    ) as HTMLInputElement;

    const searchButton = document.querySelector(
      '[data-testid=search-search]',
    ) as HTMLInputElement;
    act(() => {
      clearButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(onSearch).toHaveBeenNthCalledWith(1, null);
  });

  it('should call onSearch when Search btn is clicked', () => {
    const onSearch = jest.fn();

    act(() => {
      render(<Search onSearch={onSearch} value={''} />, container);
    });
    const searchButton = document.querySelector(
      '[data-testid=search-search]',
    ) as HTMLInputElement;

    act(() => {
      searchButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onSearch).toHaveBeenNthCalledWith(1, '');
  });
});
