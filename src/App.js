import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Viewer from './Viewer';
import HtmlEditor from './HtmlEditor';
import CssEditor from './CssEditor';

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
class App extends Component {
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
      updateHtmlCode: this.crateAction(ACTIONS.UPDATE_HTML_CODE),
      updateCssCode: this.crateAction(ACTIONS.UPDATE_CSS_CODE)
    };

    // bind context
    this.dispatch = this.dispatch.bind(this);
  }

  /**
   * action creator
   * @param type
   * @returns {function(this:App)}
   */
  crateAction(type) {
    return function(payload) {
      return { type, payload };
    };
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
    const { updateHtmlCode, updateCssCode } = this.actions;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React DOM Imager Demo</h2>
        </div>
        <div className="App-main">
          <Viewer className="App-column" />
          <div className="App-column">
            <HtmlEditor value={htmlCode} dispatch={this.dispatch} actions={{ updateHtmlCode }} />
            <CssEditor value={cssCode} dispatch={this.dispatch} actions={{ updateCssCode }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
