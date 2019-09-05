import React, { Component } from "react";
import { Button,Input } from "antd";
export class DocCheck extends Component {
  render() {
    return (
      <div>
        <p>Enter the </p>
        <Input placeholder="enter location ID here"></Input>
        <Button type="primary">Doc Check</Button>
      </div>
    );
  }
}

export default DocCheck;
