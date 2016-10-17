import React, { PropTypes } from 'react';
import CommonComponent from './CommonComponent';

/**
 * TabItem class
 */
export default class TabItem extends CommonComponent {
  /**
   * @returns {{id: *}}
   */
  static get propTypes() {
    return {
      id: PropTypes.string.isRequired
    }
  }

  /**
   * @returns {XML}
   */
  render() {
    // cache
    const { id, children } = this.props;

    // JSX template
    return (
      <div className="TabItem" id={id}>{children}</div>
    );
  }
}
