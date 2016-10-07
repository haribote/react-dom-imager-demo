import { Component, PropTypes } from 'react';

/**
 * CommonComponent class
 */
export default class CommonComponent extends Component {
  /**
   * @static propTypes
   * @returns {{dispatch: *, actions: *}}
   */
  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      actions : PropTypes.objectOf(PropTypes.func)
    }
  }

  /**
   * @method bind context to self
   * @param methodNames
   */
  bindContextAll(...methodNames) {
    methodNames.forEach((methodName) => {
      this[methodName] = this[methodName].bind(this);
    });
  }
}
