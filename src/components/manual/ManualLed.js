import React from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";

import "../../bootstrap/bootstrap.min.css";
import CustomButton from "../base/Button";

export default class ManualLed extends React.Component {
	constructor(props) {
		super(props);

		this.state = { led: 1, color: "#000000" };
		console.log(this.props.leds);
	}

	render() {
		return (
			<Modal show={this.props.open} onHide={this.props.closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Manual</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<Col sm={4} className="d-flex align-items-center">
								<Form.Control
									type="number"
									value={this.state.led}
									step={1}
									min={1}
									max={this.props.leds}
									onChange={(event) => {
										// if(event.target.value <= this.props.leds && event.target.value > 0){
											this.setState({ led: event.target.value });
										// }
									}}
									onBlur={(event) => {
										if(event.target.value > this.props.leds){
											this.setState({ led: this.props.leds });
										} else if(event.target.value <= 0){
											this.setState({ led: 0 });
										}
									}}
								/>
							</Col>
							<Col sm={8}>
								<Form.Control
									type="color"
									value={this.state.color}
									// margin="dense"
									onChange={(event) => {
										this.setState({ color: event.target.value });
									}}
								/>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<CustomButton
						title="Zmień jedną"
						onclick={() => {
							this.props.saveSingle(this.state.led, this.state.color);
						}}
					/>
					<CustomButton
						title="Zmień wszystkie"
						onclick={() => {
							this.props.saveAll(this.state.color);
						}}
					/>
					<CustomButton title="Zamknij" color="secondary" onclick={this.props.closeModal} />
				</Modal.Footer>
			</Modal>
		);
	}
}
