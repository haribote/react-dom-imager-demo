import React from 'react';
import CommonComponent from './CommonComponent';

describe('Editor', () => {
  it('returns propTypes', () => {
    const propTypes = CommonComponent.propTypes;
    expect(propTypes.dispatch).toBeDefined();
    expect(propTypes.actions).toBeDefined();
  });
});
