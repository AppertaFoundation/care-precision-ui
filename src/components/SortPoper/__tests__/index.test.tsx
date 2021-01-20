import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

import SortPoper from '../index';

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
  it('shuld on the first render hidde a poper menu', () => {
    act(() => {
      render(
        <SortPoper>
          <p>child</p>
        </SortPoper>,
        container,
      );
    });
    const poper = document.querySelector(
      '[data-testid=menu-poper]',
    ) as HTMLDivElement;
    const style = poper.getAttribute('style');
    expect(style?.includes('hidden')).toBeTruthy();
  });

  it('should show a poper when a open button is cliked', () => {
    act(() => {
      render(
        <SortPoper>
          <p>child</p>
        </SortPoper>,
        container,
      );
    });

    const openButton = document.querySelector(
      '[data-testid=sortPoper-button]',
    ) as HTMLInputElement;

    const poper = document.querySelector(
      '[data-testid=menu-poper]',
    ) as HTMLDivElement;

    act(() => {
      openButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const style = poper.getAttribute('style');
    expect(style?.includes('hidden')).toBeFalsy();
  });

  it('should show a poper when a open button is cliked', () => {
    act(() => {
      render(
        <SortPoper>
          <p>child</p>
        </SortPoper>,
        container,
      );
    });

    const openButton = document.querySelector(
      '[data-testid=sortPoper-button]',
    ) as HTMLInputElement;

    const poper = document.querySelector(
      '[data-testid=menu-poper]',
    ) as HTMLDivElement;

    act(() => {
      openButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const style = poper.getAttribute('style');
    expect(style?.includes('hidden')).toBeFalsy();
  });
});
