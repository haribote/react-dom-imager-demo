import React from 'react';
import {shallow} from 'enzyme';
import TabItem from './TabItem';

describe('Modal', () => {
  it('renders without crashing', () => {
    shallow(<TabItem />);
  });
});
