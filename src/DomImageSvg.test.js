import React from 'react';
import ReactDOM from 'react-dom';
import DomImageSvg from './DomImageSvg';

describe('Editor', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DomImageSvg htmlCode="" cssCode="" />, div);
  });
});
