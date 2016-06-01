import React from 'react';


export default class ImgFigure extends React.Component {
  render() {

    var styleObj = {};
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    return (
      <figure className="img-figure" style={styleObj}>
        <img src={this.props.data.imageURL} alt={this.props.data.title} className="image"/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}
