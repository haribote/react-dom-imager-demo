import React from 'react';
import {shallow} from 'enzyme';
import Tabs from './Tabs';
import TabItem from './TabItem'

describe('Tabs', () => {
  it('renders without crashing', () => {
    shallow(
      <Tabs active="test" onClickTab={() => {}}>
        <TabItem id="test" title="TEST">
          <p>test</p>
        </TabItem>
      </Tabs>
    );
  });

  it('calls onClickTab with a argument', () => {
    const mockOnClickHandler = jest.fn();
    const mockPreventDefaultMethod = jest.fn();
    const wrapper = shallow(
      <Tabs active="test" onClickTab={mockOnClickHandler}>
        <TabItem id="test" title="TEST">
          <p>test</p>
        </TabItem>
      </Tabs>
    );
    wrapper.find('.Tabs-list a').first().simulate('click', {
      preventDefault: mockPreventDefaultMethod
    });
    expect(mockPreventDefaultMethod).toHaveBeenCalled();
    expect(mockOnClickHandler.mock.calls.length).toBe(1);
    expect(mockOnClickHandler.mock.calls[0][0]).toBe('test');
  });
});
