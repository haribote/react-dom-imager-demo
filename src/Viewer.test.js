import React from 'react';
import {shallow} from 'enzyme';
import Viewer from './Viewer';
import DomImageSvg from './DomImageSvg';

describe('Viewer', () => {
  it('renders without crashing', () => {
    shallow(<Viewer svg={<DomImageSvg htmlCode="<p>Hello, world!</p>" cssCode="'p {\n  color: red;\n}'" />} />);
  });
});
