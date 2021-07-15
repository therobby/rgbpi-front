import React from "react";
import { Button } from "react-bootstrap";

import "../../bootstrap/bootstrap.min.css";
// import "./Button.css";

export default class CustomButton extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Button variant={this.props.color ? this.props.color : "primary"} onClick={this.props.onclick}>
				{this.props.title}
			</Button>
		);
	}
}
