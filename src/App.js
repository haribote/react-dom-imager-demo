import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Viewer from './Viewer';
import HtmlEditor from './HtmlEditor';
import CssEditor from './CssEditor';

/**
 * @const action types
 * @type {{UPDATE_HTML_STRING: string, UPDATE_CSS_STRING: string}}
 */
const ACTIONS = {
  UPDATE_HTML_STRING: 'UPDATE_HTML_STRING',
  UPDATE_CSS_STRING : 'UPDATE_CSS_STRING'
};

/**
 * App container class
 */
class App extends Component {
  /**
   * @static
   * @returns {{htmlString: string}}
   */
  static get initialState() {
    return {
      htmlString: '<p>Hello, world!</p>',
      cssString : 'p { font-size: 2rem; }'
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
      updateHtmlString: this.crateAction(ACTIONS.UPDATE_HTML_STRING),
      updateCssString: this.crateAction(ACTIONS.UPDATE_CSS_STRING)
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

    case ACTIONS.UPDATE_HTML_STRING:
      return {
        htmlString: payload
      };

    case ACTIONS.UPDATE_CSS_STRING:
      return {
        cssString: payload
      };

    default:
      return this.state;
    }

  }

  /**
   * @returns {XML}
   */
  render() {
    const { htmlString, cssString } = this.state;
    const { updateHtmlString, updateCssString } = this.actions;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React DOM Imager Demo</h2>
        </div>
        <div className="App-main">
          <Viewer className="App-column" />
          <div className="App-column">
            <HtmlEditor value={htmlString} dispatch={this.dispatch} actions={{ updateHtmlString }} />
            <CssEditor value={cssString} dispatch={this.dispatch} actions={{ updateCssString }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
