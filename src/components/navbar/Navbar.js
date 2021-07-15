import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import CustomButton from "../base/Button";
import "../../bootstrap/bootstrap.min.css";

export default class CustomNavbar extends React.Component {
	render() {
		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand className="mr-auto">
					<h1>RGBPI</h1>
				</Navbar.Brand>
				<Nav>
					<CustomButton color="outline-light" onclick={this.props.onOffClicked} title={this.props.off} />
					<CustomButton color="outline-light" onclick={this.props.onSettingsClicked} title={this.props.settings} />
				</Nav>
			</Navbar>
		);
	}
}
