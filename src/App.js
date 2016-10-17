import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import logo from './logo.svg';
import sampleImage from './sample-image.png';
import './App.css';
import { BaseComponent } from './CommonComponent';
import Viewer from './Viewer';
import Editor from './Editor';
import DomImageSvg from './DomImageSvg';
import Modal from './Modal';
import Tabs from './Tabs';
import TabItem from './TabItem';
import SampleImage from './SampleImage';

/**
 * @const action types
 * @type {{UPDATE_HTML_CODE: string, UPDATE_CSS_CODE: string, TOGGLE_VIEWER_ERROR: string, TOGGLE_MODAL_VISIBLE: string, CHANGE_TAB_ITEM: string, RENDERED_SAMPLE_IMAGE: string}}
 */
const ACTIONS = {
  UPDATE_HTML_CODE     : 'UPDATE_HTML_CODE',
  UPDATE_CSS_CODE      : 'UPDATE_CSS_CODE',
  TOGGLE_VIEWER_ERROR  : 'TOGGLE_VIEWER_ERROR',
  TOGGLE_MODAL_VISIBLE : 'TOGGLE_MODAL_VISIBLE',
  CHANGE_TAB_ITEM      : 'CHANGE_TAB_ITEM',
  RENDERED_SAMPLE_IMAGE: 'RENDERED_SAMPLE_IMAGE'
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
      htmlCode           : '<h1>Hello, world!</h1>',
      cssCode            : 'h1 {\n  color: red;\n}',
      isViewerDisabled   : false,
      isModalVisible     : false,
      activeTabItemId    : 'sample-html',
      sampleImageFullPath: '',
      sampleImageDataUri : ''
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
      updateHtmlCode     : createAction(ACTIONS.UPDATE_HTML_CODE),
      updateCssCode      : createAction(ACTIONS.UPDATE_CSS_CODE),
      toggleViewerError  : createAction(ACTIONS.TOGGLE_VIEWER_ERROR),
      toggleModalVisible : createAction(ACTIONS.TOGGLE_MODAL_VISIBLE),
      changeTabItem      : createAction(ACTIONS.CHANGE_TAB_ITEM),
      renderedSampleImage: createAction(ACTIONS.RENDERED_SAMPLE_IMAGE)
    };

    // bind context
    this.bindContextAll(
      'dispatch',
      '_changeHtmlCodeHandler',
      '_changeCssCodeHandler',
      '_errorViewerHandler',
      '_clickModalOpenerHandler',
      '_clickModalCloserHandler',
      '_clickTabHandler',
      '_renderSampleImageHandler'
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

    case ACTIONS.TOGGLE_MODAL_VISIBLE:
      return {
        isModalVisible: !!payload
      };

    case ACTIONS.CHANGE_TAB_ITEM:
      return {
        activeTabItemId: payload
      };

    case ACTIONS.RENDERED_SAMPLE_IMAGE:
      return (() => {
        const { sampleImageFullPath, sampleImageDataUri} = payload;
        return {
          sampleImageFullPath,
          sampleImageDataUri
        };
      })();

    default:
      return this.state;
    }

  }

  /**
   * @returns {XML}
   */
  render() {
    // cache
    const { htmlCode, cssCode, isViewerDisabled, isModalVisible, activeTabItemId, sampleImageFullPath, sampleImageDataUri } = this.state;

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
            <Editor className="HtmlEditor" name="html" value={htmlCode} onChange={this._changeHtmlCodeHandler}>
              <button onClick={this._clickModalOpenerHandler}>Samples</button>
            </Editor>
            <Editor className="CssEditor" name="css" value={cssCode} onChange={this._changeCssCodeHandler}>
              <button onClick={this._clickModalOpenerHandler}>Samples</button>
            </Editor>
          </div>
        </div>
        <ReactCSSTransitionGroup
          transitionName="fade-transition"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {isModalVisible && (
            <Modal onClickCloser={this._clickModalCloserHandler}>
              <Tabs active={activeTabItemId} onClickTab={this._clickTabHandler}>
                <TabItem id="sample-html" title="HTML">
                  <pre>
                    <code>
                      {App.initialState.htmlCode}
                    </code>
                  </pre>
                </TabItem>
                <TabItem id="sample-css" title="CSS">
                  <pre>
                    <code>
                      {App.initialState.cssCode}
                    </code>
                  </pre>
                </TabItem>
                <TabItem id="sample-image" title="Image">
                  <SampleImage
                    src={sampleImage}
                    width={400}
                    height={382}
                    fullPath={sampleImageFullPath}
                    dataUri={sampleImageDataUri}
                    onRendered={this._renderSampleImageHandler}
                  />
                </TabItem>
              </Tabs>
            </Modal>
          )}
        </ReactCSSTransitionGroup>
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
    dispatch(actions.toggleViewerError(false));
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
    dispatch(actions.toggleViewerError(false));
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

  /**
   * @listen click on Modal Opener
   * @param ev
   * @private
   */
  _clickModalOpenerHandler(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    // cache
    const { dispatch, actions } = this;

    // dispatch action
    dispatch(actions.toggleModalVisible(true));
  }

  /**
   * @listen click on Modal Closer
   * @param ev
   * @private
   */
  _clickModalCloserHandler(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    // cache
    const { dispatch, actions } = this;

    // dispatch action
    dispatch(actions.toggleModalVisible(false));
  }

  /**
   * @listen click on (.Tabs-list a)
   * @param id
   * @private
   */
  _clickTabHandler(id) {
    // cache
    const { dispatch, actions } = this;

    // dispatch action
    dispatch(actions.changeTabItem(id));
  }

  /**
   * @listen rendered on (.SampleImage canvas)
   * @param props
   * @private
   */
  _renderSampleImageHandler(props) {
    // cache
    const { dispatch, actions } = this;
    const { fullPath, dataUri } = props;

    // dispatch action
    dispatch(actions.renderedSampleImage({
      sampleImageFullPath: fullPath,
      sampleImageDataUri : dataUri
    }));
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
