import React, {PropTypes} from 'react';
import './Editor.css';
import CommonComponent from './CommonComponent';
import classNames from 'classnames';

/**
 * HtmlEditor class
 */
export default class Editor extends CommonComponent {
  /**
   * @static propTypes
   * @returns {{className: (*|boolean|number), name: *, value: (*|boolean|number)}}
   */
  static get propTypes() {
    return {
      className: PropTypes.string,
      name     : PropTypes.string.isRequired,
      value    : PropTypes.string,
      onChange : PropTypes.func.isRequired
    }
  }

  /**
   * @constructor
   * @param props
   */
  constructor(props) {
    super(props);

    this.bindContextAll(
      '_submitHandler',
      '_changeHandler'
    );
  }

  /**
   * @returns {XML}
   */
  render() {
    // cache
    const { className, name, value } = this.props;

    // JSX Template
    return (
      <form action="" method="GET" className={classNames('Editor', className)} onSubmit={this._submitHandler}>
        <textarea name={name} cols="30" rows="10" value={value} onChange={this._changeHandler} />
      </form>
    );
  }

  /**
   * @listen submit <form />
   * @param ev
   * @private
   */
  _submitHandler(ev) {
    ev.preventDefault();
  }

  /**
   * @listen change <textarea />
   * @param ev
   * @private
   */
  _changeHandler(ev) {
    this.props.onChange(ev.target.value);
  }
}
