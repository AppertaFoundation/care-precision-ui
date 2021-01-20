import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { AcuityDashboard } from '../index';

const shallowRenderer = createRenderer();

describe('<Acuity Dashboard />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(<AcuityDashboard />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
