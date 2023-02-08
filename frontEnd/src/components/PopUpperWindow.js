import React, { Component } from "react";

/**
 * Component that alerts if you click outside of it
 */
export default class PopUpperWindow extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.indf();
    }
  }

  render() {
    return (<div><div className="hideback"></div><div ref={this.wrapperRef}>{this.props.children}</div> </div>);
  }
}