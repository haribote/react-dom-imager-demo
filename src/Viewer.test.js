import React from 'react';
import {shallow} from 'enzyme';
import Viewer from './Viewer';

describe('Viewer', () => {
  it('renders without crashing', () => {
    shallow(<Viewer />);
  });
});
