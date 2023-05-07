import { Dialog } from "primereact/dialog";
import React, { Component } from "react";
import { Fragment } from "react";
import { RotatingLines } from "react-loader-spinner";

export class Loader extends Component {
  render() {
    return (
      //this.props.loading
      <Fragment>
        <Dialog
          showHeader={false}
          visible={this.props.loading}
          contentStyle={{ background: "#f3fbfd", textAlign: "center" }}
        >
          <i className="text-dark">Veuillez patienter ...</i>
          <br />
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </Dialog>
      </Fragment>
    );
  }
}

export default Loader;
