import React, { Component } from "react";
import "./CopyContainer.css";
import CopyItem from "./CopyItem";
import { v4 as uuid } from "uuid";

class CopyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyItems: JSON.parse(localStorage.getItem("copyItems")) || [],
      warn: false,
    };
    this.handlePaste = this.handlePaste.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.changeFontSize = this.changeFontSize.bind(this);
  }

  handlePaste(e) {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    if (paste === "") return;

    const found = this.state.copyItems.find(
      (current) => current.text === paste
    );
    if (found) {
      this.setState({ warn: true });
      setTimeout(() => {
        this.setState({ warn: false });
      }, 3000);
      return;
    }

    const copyItem = { text: paste, id: uuid(), fontSize: parseFloat(1) };
    this.setState((prev) => {
      return { copyItems: [...prev.copyItems, copyItem] };
    });
  }

  handleCopy(copyText) {
    navigator.clipboard.writeText(copyText);
  }

  handleDelete(id) {
    this.setState({
      copyItems: this.state.copyItems.filter((current) => current.id !== id),
    });
  }

  componentDidUpdate() {
    localStorage.setItem("copyItems", JSON.stringify(this.state.copyItems));
  }

  changeFontSize(id, changeSymbol) {
    let updatedItems;
    if(changeSymbol === '+') {
      updatedItems = this.state.copyItems.map(current => {
        if(current.id === id){
          return {...current, fontSize: (parseFloat(current.fontSize) + parseFloat(0.1)).toFixed(1)}
        }
        return current;
      })
    } else {
      updatedItems = this.state.copyItems.map(current => {
        if(current.id === id && current.fontSize != 0.5)
          return {...current, fontSize: (parseFloat(current.fontSize) - parseFloat(0.1)).toFixed(1)};
        
        return current;
      })
    }
    this.setState({copyItems: updatedItems})
  }

  render() {
    return (
      <div className="CopyContainer" onPaste={this.handlePaste}>
        {this.state.warn && (
          <div className="warn">Pasted content already present on the page</div>
        )}
        {this.state.copyItems.length === 0 ? (
          <h1 className="no-items">No Items, paste some text</h1>
        ) : (
          this.state.copyItems.map((current) => {
            return (
              <CopyItem
                text={current.text}
                key={current.id}
                id={current.id}
                fontSize={current.fontSize}
                copy={this.handleCopy}
                delete={this.handleDelete}
                changeFontSize={this.changeFontSize}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default CopyContainer;
