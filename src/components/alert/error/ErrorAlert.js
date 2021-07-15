import React from "react";
import { Alert } from "react-bootstrap";
import "../../../bootstrap/bootstrap.min.css";

export default class ErrorAlert extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Alert show={this.props.open} variant="danger" onClose={this.props.onClose} dismissible>
				<Alert.Heading>Error occoured!</Alert.Heading>
				<p>{this.props.err}</p>
			</Alert>
		);
	}
}
