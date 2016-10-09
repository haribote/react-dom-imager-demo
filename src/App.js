import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BaseComponent } from './CommonComponent';
import Viewer from './Viewer';
import Editor from './Editor';
import DomImageSvg from './DomImageSvg';

/**
 * @const action types
 * @type {{UPDATE_HTML_CODE: string, UPDATE_CSS_CODE: string, TOGGLE_VIEWER_ERROR: string}}
 */
const ACTIONS = {
  UPDATE_HTML_CODE   : 'UPDATE_HTML_CODE',
  UPDATE_CSS_CODE    : 'UPDATE_CSS_CODE',
  TOGGLE_VIEWER_ERROR: 'TOGGLE_VIEWER_ERROR'
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
      htmlCode        : '<h1>Hello, world!</h1>',
      cssCode         : 'h1 {\n  color: red;\n}',
      isViewerDisabled: false
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
      updateHtmlCode   : createAction(ACTIONS.UPDATE_HTML_CODE),
      updateCssCode    : createAction(ACTIONS.UPDATE_CSS_CODE),
      toggleViewerError: createAction(ACTIONS.TOGGLE_VIEWER_ERROR)
    };

    // bind context
    this.bindContextAll(
      'dispatch',
      '_changeHtmlCodeHandler',
      '_changeCssCodeHandler',
      '_errorViewerHandler'
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

    case ACTIONS.TOGGLE_VIEWER_ERROR:
      return {
        isViewerDisabled: !!payload
      };

    default:
      return this.state;
    }

  }

  /**
   * @returns {XML}
   */
  render() {
    // cache
    const { htmlCode, cssCode, isViewerDisabled } = this.state;

    // JSX template
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React DOM Imager Demo</h2>
        </div>
        <div className="App-main">
          <Viewer className="App-column" svg={this.renderSvg()} isDisabled={isViewerDisabled} onError={this._errorViewerHandler} />
          <div className="App-column">
            <Editor className="HtmlEditor" name="html" value={htmlCode} onChange={this._changeHtmlCodeHandler} />
            <Editor className="CssEditor" name="css" value={cssCode} onChange={this._changeCssCodeHandler} />
          </div>
        </div>
      </div>
    );
  }

  /**
   * @returns {XML}
   */
  renderSvg() {
    // cache
    const { htmlCode, cssCode } = this.state;

    return (
      <DomImageSvg htmlCode={htmlCode} cssCode={cssCode} />
    );
  }

  /**
   * @listen change on <textarea name="html" />
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
   * @listen change on <textarea  name="css" />
   * @param value
   * @private
   */
  _changeCssCodeHandler(value) {
    // cache
    const { dispatch, actions } = this;

    // dispatch action
    dispatch(actions.updateCssCode(value));
  }

  /**
   * @listen error on <Viewer />
   * @private
   */
  _errorViewerHandler() {
    // cache
    const { dispatch, actions } = this;

    // dispatch action
    dispatch(actions.toggleViewerError(true));
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
