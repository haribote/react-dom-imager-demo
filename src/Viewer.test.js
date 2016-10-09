import React from 'react';
import sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import Viewer from './Viewer';
import DomImageSvg from './DomImageSvg';

describe('Viewer', () => {
  afterEach(() => {
    open.restore && open.restore();
    URL.createObjectURL && URL.createObjectURL.restore && URL.createObjectURL.restore();
    URL.revokeObjectURL && URL.revokeObjectURL.restore && URL.revokeObjectURL.restore();
  });

  it('renders without crashing', () => {
    shallow(<Viewer svg={<DomImageSvg htmlCode="<p>Hello, world!</p>" cssCode="'p {\n  color: red;\n}'" />} onError={() => {}} />);
  });

  it('cancels to open window', () => {
    const wrapper = mount(<Viewer svg={<DomImageSvg htmlCode="<p>Hello, world!</p>" cssCode="'p {\n  color: red;\n}'" />} isDisabled={true} onError={() => {}} />);
    const mockPreventDefaultMethod = jest.fn();
    expect(wrapper.instance().clickDownloadButtonHandler({
      preventDefault: mockPreventDefaultMethod,
      target        : {
        value: ''
      }
    })).toBeUndefined();
  });

  it('opens svg in new window', () => {
    Object.assign(self, {
      open: sinon.spy()
    });
    Object.assign(self.URL, {
      createObjectURL: sinon.spy(() => {
        return 'blob:http:'
      }),
      revokeObjectURL: sinon.spy()
    });
    const wrapper = mount(<Viewer svg={<DomImageSvg htmlCode="<p>Hello, world!</p>" cssCode="'p {\n  color: red;\n}'" />} onError={() => {}} />);
    const mockPreventDefaultMethod = jest.fn();
    wrapper.instance().clickDownloadButtonHandler({
      preventDefault: mockPreventDefaultMethod,
      target        : {
        value: 'svg'
      }
    });
    expect(mockPreventDefaultMethod).toHaveBeenCalled();
    expect(open.calledWith('blob:http:', 'generatedImage')).toBe(true);
  });


  it('does not open any', () => {
    const wrapper = mount(<Viewer svg={<DomImageSvg htmlCode="<p>Hello, world!</p>" cssCode="'p {\n  color: red;\n}'" />} onError={() => {}} />);
    const mockPreventDefaultMethod = jest.fn();
    expect(wrapper.instance().clickDownloadButtonHandler({
      preventDefault: mockPreventDefaultMethod,
      target        : {
        value: ''
      }
    })).toBeUndefined();
  })
});
