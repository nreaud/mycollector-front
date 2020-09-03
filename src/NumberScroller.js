import React from "react";
import { Component } from "react";
import "./NumberScroller.css";

class NumberScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customOnChange: props.onChange,
      minValue: 0,
      maxValue: props.maxValue,
      value: props.value,
      customAttrs: props.customAttrs,
    };
  }

  handleChange = (event) => {
    //Arrow to bind with 'this'
    const { minValue, maxValue } = this.state;
    let newValue = event.target.value;
    if (newValue < minValue) {
      newValue = minValue;
    } else if (newValue > maxValue) {
      newValue = maxValue;
    } else {
      this.state.customOnChange(event);
    }
    this.setState({ value: newValue });
  };

  render() {
    const { customAttrs, defaultValue, value } = this.state;
    console.log(customAttrs);
    return (
      <input
        className="lastReadInput"
        type="number"
        defaultValue={defaultValue}
        value={value}
        onChange={this.handleChange}
        {...customAttrs}
      />
      //TODO need a submit
    );
  }
}

export default NumberScroller;
