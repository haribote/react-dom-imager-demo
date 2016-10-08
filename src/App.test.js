import React from 'react';
import {shallow} from 'enzyme';
import App, { createAction } from './App';
import Viewer from './Viewer';
import Editor from './Editor';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('have a Viewer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Viewer).length).toBe(1);
  });

  it('have two Editor component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Editor).length).toBe(2);
  });

  it('update to new state', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().dispatch({
      type   : 'UPDATE_HTML_CODE',
      payload: '<p>Hello, guys!</p>'
    });
    expect(wrapper.state('htmlCode')).toBe('<p>Hello, guys!</p>');
  });

  it('return new state of htmlCode', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.instance().reduce('UPDATE_HTML_CODE', '<p>Hello, guys!</p>')).toEqual({
      htmlCode: '<p>Hello, guys!</p>'
    });
  });

  it('return new state of cssCode', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.instance().reduce('UPDATE_CSS_CODE', 'p {\n  font-size: 1rem;\n}')).toEqual({
      cssCode: 'p {\n  font-size: 1rem;\n}'
    });
  });

  it('return current state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.instance().reduce('UNKNOWN_ACTION', 'test value')).toEqual(wrapper.state());
  });

  it('call dispatch method with UPDATE_HTML_CODE action', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.dispatch = jest.fn();
    instance._changeHtmlCodeHandler('test value');
    expect(instance.dispatch.mock.calls.length).toBe(1);
    expect(instance.dispatch.mock.calls[0][0]).toEqual({
      type: 'UPDATE_HTML_CODE',
      payload: 'test value'
    });
  });

  it('call dispatch method with UPDATE_CSS_CODE action', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.dispatch = jest.fn();
    instance._changeCssCodeHandler('test value');
    expect(instance.dispatch.mock.calls.length).toBe(1);
    expect(instance.dispatch.mock.calls[0][0]).toEqual({
      type: 'UPDATE_CSS_CODE',
      payload: 'test value'
    });
  });
});

describe('createAction', () => {
  it('return the test action', () => {
    const testAction = createAction('test');
    expect(testAction('test payload')).toEqual({
      type   : 'test',
      payload: 'test payload'
    })
  });
});