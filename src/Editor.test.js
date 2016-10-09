import React from 'react';
import {shallow} from 'enzyme';
import Editor from './Editor';

describe('Editor', () => {
  it('renders without crashing', () => {
    shallow(<Editor name="test" onChange={jest.fn()} />);
  });

  it('calls preventDefault method', () => {
    const wrapper = shallow(<Editor name="test" onChange={jest.fn()} />);
    const mockPreventDefaultMethod = jest.fn();
    wrapper.instance()._submitHandler({
      preventDefault: mockPreventDefaultMethod
    });
    expect(mockPreventDefaultMethod).toHaveBeenCalled();
  });

  it('calls onChange handler with a argument', () => {
    const mockOnChangeHandler = jest.fn();
    const wrapper = shallow(<Editor name="test" onChange={mockOnChangeHandler} />);
    wrapper.instance()._changeHandler({
      target: {
        value: 'test value'
      }
    });
    expect(mockOnChangeHandler.mock.calls.length).toBe(1);
    expect(mockOnChangeHandler.mock.calls[0][0]).toBe('test value');
  });
});
