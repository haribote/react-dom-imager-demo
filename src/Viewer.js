import React from 'react';
import CommonComponent from './CommonComponent';
import classNames from 'classnames';

/**
 * Viewer component class
 */
export default class Viewer extends CommonComponent {
  /**
   * @returns {XML}
   */
  render() {
    // cache
    const { className } = this.props;

    // JSX Template
    return (
      <div className={classNames('Viewer', className)}></div>
    );
  }
}
