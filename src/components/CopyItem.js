import React, { Component } from "react";
import "./CopyItem.css";

class CopyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFontChange = this.handleFontChange.bind(this);
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

  handleFontChange(e) {
    this.props.changeFontSize(this.props.id, e.target.innerHTML);
  }

  render() {
    const fontSize = this.props.fontSize + 'em';
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
          <button onClick={this.handleFontChange}>+</button>
          <button onClick={this.handleFontChange}>-</button>
          <button title="Delete Item" onClick={this.handleDelete}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default CopyItem;
