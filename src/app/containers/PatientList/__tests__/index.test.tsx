import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { PatientList } from '../index';

const shallowRenderer = createRenderer();

describe('<PatientList />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(<PatientList />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
