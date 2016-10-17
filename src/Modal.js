import React, {PropTypes} from 'react';
import './Modal.css';
import CommonComponent from './CommonComponent';

/**
 * Modal class
 */
export default class Modal extends CommonComponent {
  /**
   * @returns {{onClickCloser: *}}
   */
  static get propTypes() {
    return {
      onClickCloser: PropTypes.func.isRequired
    }
  }

  /**
   * @returns {XML}
   */
  render() {
    // cache
    const { children, onClickCloser } = this.props;

    // JSX template
    return (
      <div className="Modal">
        <div className="Modal-background" onClick={onClickCloser}></div>
        <div className="Modal-container">
          <div className="Modal-header">
            <h3>Samples</h3>
          </div>
          <div className="Modal-body">
            {children}
          </div>
          <div className="Modal-footer">
            <button onClick={onClickCloser}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}
