import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import './Viewer.css';
import CommonComponent from './CommonComponent';
import classNames from 'classnames';

/**
 * @type {Symbol}
 */
const keyOfStaticSvgBlob = Symbol('staticSvgBlob');

/**
 * @type {string|*}
 */
let lastSvgUrl;

/**
 * Viewer component class
 */
export default class Viewer extends CommonComponent {
  /**
   * @static
   * @returns {{className: (number|boolean|*|string), isDisabled: *, onError: *}}
   */
  static get propTypes() {
    return {
      className: PropTypes.string,
      isDisabled: PropTypes.bool,
      onError   : PropTypes.func.isRequired
    }
  }

  /**
   * @static
   * @returns {{isDisabled: boolean}}
   */
  static get defaultProps() {
    return {
      isDisabled: false
    }
  }

  /**
   * @constructor
   * @param props
   */
  constructor(props) {
    // inherit
    super(props);

    // property
    this[keyOfStaticSvgBlob] = null;

    // bind context
    this.bindContextAll(
      'clickDownloadButtonHandler'
    );
  }

  /**
   * lifecycle
   */
  componentDidMount() {
    this[keyOfStaticSvgBlob] = this.drawCanvas();
  }

  /**
   * lifecycle
   */
  componentDidUpdate() {
    this[keyOfStaticSvgBlob] = this.drawCanvas();
  }

  /**
   * @returns {XML}
   */
  render() {
    // cache
    const { className, svg, isDisabled } = this.props;

    // JSX Template
    return (
      <div className={classNames('Viewer', className)}>
        <div className="Viewer-canvas">
          {!isDisabled ? (
            <canvas ref="canvas" width={svg.props.width} height={svg.props.height} />
          ) : (
            <div className="Viewer-error">
              <p><i>&#xd83d;&#xde1c;</i> <strong>Oops...!</strong></p>
              <p>Your using browser <br />does not support the feature.</p>
            </div>
          )}
        </div>
        {!isDisabled && (
          <div className="Viewer-command">
            {['svg'].map((val) => (
              <p key={val}><button value={val} onClick={this.clickDownloadButtonHandler}>Get {val.toUpperCase()}</button></p>
            ))}
          </div>
        )}
      </div>
    );
  }

  /**
   * @returns {*}
   */
  renderSvgToStaticMarkup() {
    // cache
    const { svg } = this.props;

    return ReactDOMServer.renderToStaticMarkup(svg)
  }

  /**
   * draw svg to canvas
   * @returns {*}
   */
  drawCanvas() {
    if (this.props.isDisabled) {
      return;
    }

    // cache
    const canvas        = findDOMNode(this.refs.canvas);
    const context       = canvas.getContext('2d');
    const imageEl       = new Image();
    const staticSvgBlob = new Blob([this.renderSvgToStaticMarkup()], { type: 'image/svg+xml;charset=utf-8' });
    const url           = URL.createObjectURL(staticSvgBlob);

    // set load event handler
    imageEl.onload = () => {
      // draw image
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(imageEl, 0, 0);

      // revoke url
      URL.revokeObjectURL(url);
    };

    // set error event handler
    imageEl.onerror = () => {
      this.props.onError();
    };

    // load image
    imageEl.crossOrigin = 'Anonymous';
    imageEl.src = url;

    // return staticSvgBlob
    return staticSvgBlob;
  }

  /**
   * @listen click on <button>
   * @param ev
   */
  clickDownloadButtonHandler(ev) {
    ev.preventDefault();

    // cache
    const { value } = ev.target;
    const canvas  = findDOMNode(this.refs.canvas);
    let url;

    // cancel process when has no canvas
    if (!canvas) {
      return;
    }

    // set url
    switch (value) {
    case 'svg':
      url = URL.createObjectURL(this[keyOfStaticSvgBlob]);
      break;
    default:
      return;
    }

    // open in new window
    if (lastSvgUrl) {
      URL.revokeObjectURL(lastSvgUrl);
    }
    lastSvgUrl = url;
    open(lastSvgUrl, 'generatedImage');
  }
}
