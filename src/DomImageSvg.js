import React, { PureComponent, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';

/**
 * DomImageSvg class
 */
export default class DomImageSvg extends PureComponent {
  /**
   * @static propTypes
   * @returns {{width: (boolean|*|string), height: (boolean|*|string), htmlCode: *, cssCode: *}}
   */
  static get propTypes() {
    return {
      width    : PropTypes.number,
      height   : PropTypes.number,
      htmlCode : PropTypes.string.isRequired,
      cssCode  : PropTypes.string.isRequired
    }
  }

  /**
   * @returns {{width: number, height: number}}
   */
  static get defaultProps() {
    return {
      width    : 960,
      height   : 1280
    }
  }

  /**
   * @returns {XML}
   */
  render() {
    // cache
    const { width, height, cssCode } = this.props;

    // JSX template
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <style>{cssCode}</style>
        <g dangerouslySetInnerHTML={{
          __html: `<foreignObject x="0" y="0" width="100%" height="100%">${ReactDOMServer.renderToStaticMarkup(this.renderInnerHtml())}</foreignObject>`
        }} />
      </svg>
    );
  }

  /**
   * @returns {XML}
   */
  renderInnerHtml() {
    // cache
    const { htmlCode } = this.props;

    // JSX template
    return (
      <div xmlns="http://www.w3.org/1999/xhtml" dangerouslySetInnerHTML={{
        __html: htmlCode
      }} />
    );
  }
}
