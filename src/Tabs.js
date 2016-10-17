import React, {PropTypes} from 'react';
import './Tabs.css';
import CommonComponent from './CommonComponent';
import classNames from 'classnames';

/**
 * Tabs class
 */
export default class Tabs extends CommonComponent {
  /**
   * @returns {{active: *, onClickTab: *, children: *}}
   */
  static get propTypes() {
    return {
      active  : PropTypes.string.isRequired,
      onClickTab: PropTypes.func.isRequired,
      children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
      ]).isRequired
    }
  }

  /**
   * @constructor
   * @param props
   */
  constructor(props) {
    // inherit
    super(props);

    // bind context
    this.bindContextAll(
      '_onClickTabsListItem'
    );
  }

  /**
   * @returns {XML}
   */
  render () {
    // cache
    const { children, active } = this.props;
    const _children = Array.isArray(children) ? children : [children];

    // JSX template
    return (
      <div className="Tabs">
        <ul className="Tabs-list">
          {_children.map((child) => {
            const { id, title } = child.props;
            return (
              <li key={id} className={classNames({ 'is-active': id === active })}>
                <a href={`#${id}`} onClick={(ev) => {this._onClickTabsListItem(ev, id)}}>{title}</a>
              </li>
            );
          })}
        </ul>
        <div className="Tabs-body">
          {_children.filter((child) => child.props.id === active)}
        </div>
      </div>
    );
  }

  /**
   * @listen click on (.Tabs-list a)
   * @param ev
   * @param id
   * @private
   */
  _onClickTabsListItem(ev, id) {
    ev.preventDefault();

    this.props.onClickTab(id)
  }
}
