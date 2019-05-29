import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NProgress } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NProgress />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
