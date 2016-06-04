import React from 'react';


export default class ImgFigure extends React.Component {

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this)
  }
  render() {

    var styleObj = {};
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    if (this.props.arrange.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function(value) {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }.bind(this))

    }
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }
    var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? 'is-inverse': '';
    return (
      <figure className={imgFigureClassName} style={styleObj}>
        <img src={this.props.data.imageURL} alt={this.props.data.title} className="image" onClick={this._handleClick} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this._handleClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }
  _handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  }
}
