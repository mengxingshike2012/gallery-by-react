import React from 'react';

export default class ControllerUnit extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  render() {

    var controllerUnitClassName = 'controller-unit';
    if (this.props.arrange.isCenter) {
      controllerUnitClassName += ' is-center';

      if (this.props.arrange.isInverse) {
        controllerUnitClassName += ' is-inverse';
      }
    }

    return (
        <span className={controllerUnitClassName} onClick={this.handleClick}> </span>
    );
  }
  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    e.preventDefault();
    e.stopPropagation();
  }
}
