require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import {findDOMNode} from 'react-dom';
import ImgFigure from './ImgFigure.js';
import ControllerUnit from './ControllerUnit.js';

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
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr: [
        /* {
          pos: {
            left: '0',
            top: '0'
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        } */
      ]
    }
    this.Constants = {
      centerPos: {
        left:0,
        right:0
      },
      hPosRange: {
        leftSecX: [0,0],
        rightSecX: [0,0],
        y: [0,0]
      },
      vPosRange: {
        x: [0,0],
        topY: [0,0]
      }
    }
    this._rearrange = this._rearrange.bind(this);
    this._getRangeRandom = this._getRangeRandom.bind(this);
    this._get30degRandom = this._get30degRandom.bind(this);
    this._inverse = this._inverse.bind(this)
  }

  componentDidMount() {
    // get the size of the stage
    var stageDOM = findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    // get the size of imageFigure
    var imgFigureDOM = findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

      this.Constants.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      }

      this.Constants.hPosRange.leftSecX[0] = -halfImgW;
      this.Constants.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
      this.Constants.hPosRange.rightSecX[0] = halfStageW + halfImgW;
      this.Constants.hPosRange.rightSecX[1] = stageW - halfImgW;
      this.Constants.hPosRange.y[0] = -halfImgH;
      this.Constants.hPosRange.y[1] = stageH - halfImgH;

      this.Constants.vPosRange.topY[0] = -halfImgH;
      this.Constants.vPosRange.topY[1] = halfStageH - halfImgH * 3;
      this.Constants.vPosRange.x[0] = halfStageW -imgW;
      this.Constants.vPosRange.x[1] = halfStageW;

      this._rearrange(0);
  }

  _inverse(index) {
    return function() {
      var imgsArrangeArr = this.state.imgsArrangeArr;

      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }.bind(this);
  }

  _center(index) {
    return function() {
      this._rearrange(index);
    }.bind(this);
  }

  _rearrange(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constants = this.Constants,
        centerPos = Constants.centerPos,
        hPosRange = Constants.hPosRange,
        vPosRange = Constants.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        imgsArrangeCenterArr[0]= {
          pos: centerPos,
          rotate: 0,
          isCenter: true
        };

        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        imgsArrangeTopArr.forEach(function(value, index) {
            imgsArrangeTopArr[index] = {
              pos: {
                top: this._getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                left: this._getRangeRandom(vPosRangeX[0], vPosRangeX[1])
              },
              rotate: this._get30degRandom(),
              isCenter: false
            }
        }.bind(this));

        for (var i = 0, len = imgsArrangeArr.length, k = len / 2; i < len; i++) {
          var hPosRangeLORX = null;
          if (i < k) {
            hPosRangeLORX = hPosRangeLeftSecX;
          } else {
            hPosRangeLORX = hPosRangeRightSecX;
          }

          imgsArrangeArr[i] = {
            pos: {
              top: this._getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
              left: this._getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            },
            rotate: this._get30degRandom(),
            isCenter: false
          }
        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
          imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0,  imgsArrangeCenterArr[0]);

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        });

  }
  _getRangeRandom(low, hight) {
    return Math.ceil(Math.random() * (hight - low)) + low;
  }
  _get30degRandom() {
    return (Math.random() > 0.5 ? '' : '-')  + Math.ceil(Math.random() * 30)
  }

  render() {
    var controllerUnits = [];
    var imgFigures = [];

    imageDatas.forEach(function(value, index) {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this._inverse(index)} center={this._center(index)}/>);
      controllerUnits.push(<ControllerUnit  key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this._inverse(index)} center={this._center(index)}/>);
    }.bind(this));
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
          {controllerUnits}
        <section className="controller-nav">
          {controllerUnits}
        </section>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
