require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

// the basic info of images
var imageDatas = require('../datas/imageDatas.json');

// IIFE to get the url of image
imageDatas = (function geneImageURL(imageDatasArr) {
  for (var i = 0, len = imageDatasArr.lenght; i < len; i++) {
    var one = imageDatasArr[i];
    one.imageURL = requre('../images/' + one.fileName);
    imageDatasArr[i] = one;
  }
  return imageDatasArr;
})(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec"></section>
        <section className="controller-nav"></section>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
