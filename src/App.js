import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BaseComponent } from './CommonComponent';
import Viewer from './Viewer';
import Editor from './Editor';

/**
 * @const action types
 * @type {{UPDATE_HTML_CODE: string, UPDATE_CSS_CODE: string}}
 */
const ACTIONS = {
  UPDATE_HTML_CODE: 'UPDATE_HTML_CODE',
  UPDATE_CSS_CODE : 'UPDATE_CSS_CODE'
};

/**
 * App container class
 */
class App extends BaseComponent {
  /**
   * @static
   * @returns {{htmlCode: string, cssCode: string}}
   */
  static get initialState() {
    return {
      htmlCode: '<p>Hello, world!</p>',
      cssCode : 'p {\n  font-size: 2rem;\n}'
    }
  }

  /**
   * @constructor
   * @param props
   */
  constructor(props) {
    super(props);

    // initialize state
    this.state = App.initialState;

    // create actions
    this.actions = {
      updateHtmlCode: createAction(ACTIONS.UPDATE_HTML_CODE),
      updateCssCode: createAction(ACTIONS.UPDATE_CSS_CODE)
    };

    // bind context
    this.bindContextAll(
      'dispatch',
      '_changeHtmlCodeHandler',
      '_changeCssCodeHandler'
    );
  }

  /**
   * @method action dispatcher
   * @param action
   */
  dispatch(action) {
    // cache
    const { type, payload } = action;

    // update state
    this.setState(this.reduce(type, payload));
  }

  /**
   * @method reduce action to state
   * @param type
   * @param payload
   * @returns {*}
   */
  reduce(type, payload) {
    switch (type) {

    case ACTIONS.UPDATE_HTML_CODE:
      return {
        htmlCode: payload
      };

    case ACTIONS.UPDATE_CSS_CODE:
      return {
        cssCode: payload
      };

    default:
      return this.state;
    }

  }

  /**
   * @returns {XML}
   */
  render() {
    const { htmlCode, cssCode } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React DOM Imager Demo</h2>
        </div>
        <div className="App-main">
          <Viewer className="App-column" />
          <div className="App-column">
            <Editor className="HtmlEditor" name="html" value={htmlCode} onChange={this._changeHtmlCodeHandler} />
            <Editor className="CssEditor" name="html" value={cssCode} onChange={this._changeCssCodeHandler} />
          </div>
        </div>
      </div>
    );
  }

  /**
   * @listen change <textarea name="html" />
   * @param value
   * @private
   */
  _changeHtmlCodeHandler(value) {
    // cache
    const { dispatch, actions } = this;

    // dispatch action
    dispatch(actions.updateHtmlCode(value));
  }

  /**
   * @listen change <textarea  name="css" />
   * @param value
   * @private
   */
  _changeCssCodeHandler(value) {
    // cache
    const { dispatch, actions } = this;

    // dispatch action
    dispatch(actions.updateCssCode(value));
  }
}

/**
 * action creator
 * @returns {Function}
 */
export function createAction(type) {
  return function(payload) {
    return { type, payload };
  };
}

export default App;
