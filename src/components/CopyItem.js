import React, { Component } from "react";
import "./CopyItem.css";

class CopyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      fontSize: 1
    };
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.increaseFontSize = this.increaseFontSize.bind(this);
    this.decreaseFontSize = this.decreaseFontSize.bind(this);
  }

  handleCopy(e) {
    e.preventDefault();
    this.setState((prev) => {
      return { clicked: !prev.clicked };
    });
    this.props.copy(this.props.text);
    setTimeout(() => {
      this.setState({ clicked: false });
    }, 1000);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.delete(this.props.id);
  }

  increaseFontSize(e) {
    e.preventDefault();
    this.setState(prev => {
      return {fontSize: prev.fontSize + 0.1 };
    })
  }

  decreaseFontSize(e) {
    e.preventDefault();
    this.setState(prev => {
      return {fontSize: prev.fontSize - 0.1 };
    })
  }

  render() {
    const fontSize = this.state.fontSize + 'em';
    return (
      <div className={`CopyItem ${this.state.clicked ? "copied" : ""}`}>
        <div
          className="CopyItem-content"
          onClick={this.handleCopy}
          title="click to copy this text"
        >
          <p style={{fontSize: fontSize}}>{this.props.text}</p>
        </div>
        <div className="CopyItem-actions">
          <button onClick={this.increaseFontSize}>+</button>
          <button onClick={this.decreaseFontSize}>-</button>
          <button title="Delete Item" onClick={this.handleDelete}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default CopyItem;
