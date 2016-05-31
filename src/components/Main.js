require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ImgFigure from './ImgFigure.js'

// let yeomanImage = require('../images/yeoman.png');

// the basic info of images
var imageDatas = require('../datas/imageDatas.json');

// IIFE to get the url of image
imageDatas = (function geneImageURL(imageDatasArr) {
  for (var i = 0, len = imageDatasArr.length; i < len; i++) {
    var one = imageDatasArr[i];
    one.imageURL = require('../images/' + one.fileName);
    imageDatasArr[i] = one;
  }
  return imageDatasArr;
})(imageDatas);

class AppComponent extends React.Component {
  render() {
    var controllerUnits = [];
    var imgFigures = [];

    imageDatas.forEach(function(value) {
      imgFigures.push(<ImgFigure data={value} />);
    });
    return (
      <section className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
          {controllerUnits}
        <section className="controller-nav">
        </section>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
