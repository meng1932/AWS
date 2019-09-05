import React, { Component } from "react";
import { Button, Input } from "antd";

export class SysCheck extends Component {
  render() {
    return (
      <div>
        <p>Enter the </p>
        <Input placeholder="enter location ID here"></Input>
        <Button type="primary">System Check</Button>
      </div>
    );
  }
}

export default SysCheck;
