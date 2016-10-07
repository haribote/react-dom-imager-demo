import React, {PropTypes} from 'react';
import CommonComponent from './CommonComponent';
import Editor from './Editor';

/**
 * HtmlEditor component class
 */
export default class HtmlEditor extends CommonComponent {
  /**
   * @static propTypes
   * @returns {{value: (*|boolean|number)}}
   */
  static get propTypes() {
    return {
      value    : PropTypes.string
    }
  }

  /**
   * @constructor
   * @param props
   */
  constructor(props) {
    super(props);

    this.bindContextAll(
      '_changeHandler'
    );
  }

  /**
   * @returns {XML}
   */
  render() {
    // cache
    const { value } = this.props;

    // JSX Template
    return (
      <Editor className="HtmlEditor" name="html" value={value} onChange={this._changeHandler} />
    );
  }

  /**
   * @listen value updating
   * @param value
   * @private
   */
  _changeHandler(value) {
    // cache
    const { dispatch, actions } = this.props;

    // dispatch action
    dispatch(actions.updateHtmlString(value));
  }
}
