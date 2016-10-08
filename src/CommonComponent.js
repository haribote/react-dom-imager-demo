import { Component, PropTypes } from 'react';

/**
 * BaseComponent Class
 */
export class BaseComponent extends Component {
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

/**
 * CommonComponent class
 */
export default class CommonComponent extends BaseComponent {
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
}
