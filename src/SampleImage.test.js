import React from 'react';
import {shallow} from 'enzyme';
import SampleImage from './SampleImage';
import sampleImage from './sample-image.png';

describe('SampleImage', () => {
  it('renders without crashing', () => {
    shallow(
      <SampleImage
        src={sampleImage}
        width={400}
        height={382}
        fullPath=""
        dataUri=""
        onRendered={() => {}}
      />);
  });
});
