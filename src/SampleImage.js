import React, {PropTypes} from 'react';
import { findDOMNode } from 'react-dom';
import './SampleImage.css';
import CommonComponent from './CommonComponent';

/**
 * SampleImage class
 */
export default class SampleImage extends CommonComponent {
  /**
   * @returns {{src: *, width: (boolean|*), height: (boolean|*), fullPath: *, dataUri: *, onRendered: *}}
   */
  static get propTypes() {
    return {
      src       : PropTypes.string.isRequired,
      width     : PropTypes.number,
      height    : PropTypes.number,
      fullPath  : PropTypes.string.isRequired,
      dataUri   : PropTypes.string.isRequired,
      onRendered: PropTypes.func.isRequired
    }
  }

  /**
   * lifecycle
   */
  componentDidMount() {
    this.drawImage();
  }

  /**
   * lifecycle
   */
  componentDidUpdate(prepProps) {
    if (prepProps.src !== this.props.src) {
      this.drawImage();
    }
  }

  /**
   * @returns {XML}
   */
  render() {
    // cache
    const { width, height, fullPath, dataUri } = this.props;

    // JSX template
    return (
      <div className="SampleImage">
        <div className="SampleImage-column">
          <canvas ref="canvas" width={width} height={height} />
        </div>
        <div className="SampleImage-column">
          <p>
            <input type="text" value={`<img src="${fullPath}" width="${width}" height="${height}" alt="" />`} readOnly />
          </p>
          <p>
            <textarea value={`<img src="${dataUri}" width="${width}" height="${height}" alt="" />`} readOnly />
          </p>
        </div>
      </div>
    );
  }

  /**
   * draw image to canvas
   */
  drawImage() {
    const { src, onRendered } = this.props;
    const canvasEl = findDOMNode(this.refs.canvas);
    const context  = canvasEl.getContext && canvasEl.getContext('2d');

    if (context) {
      const imageEl = new Image();

      imageEl.onload = () => {
        context.clearRect(0, 0, canvasEl.width, canvasEl.height);
        context.drawImage(imageEl, 0, 0, imageEl.width, imageEl.height, 0, 0, canvasEl.width, canvasEl.height);
        onRendered({
          fullPath: imageEl.src,
          dataUri : canvasEl.toDataURL()
        })
      };

      imageEl.crossOrigin = 'Anonymous';
      imageEl.src = src;
    }
  }
}
