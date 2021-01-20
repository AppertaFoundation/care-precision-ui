import * as React from 'react';
import { render } from '@testing-library/react';
import { ToolBar } from '../ToolBar';

const renderToolBar = (props: Parameters<typeof ToolBar>[number]) =>
  render(<ToolBar {...props} />);

describe('<ToolBar />', () => {
  it('should match the snapshot', () => {
    const ToolBar = renderToolBar({
      children: [<p>Hello</p>, <p>Word</p>],
    });
    expect(ToolBar.container.firstChild).toMatchSnapshot();
  });
});
