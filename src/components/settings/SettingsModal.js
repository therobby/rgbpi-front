import React from "react";
import { Col, Modal, Container, Row, Form, Spinner } from "react-bootstrap";
import CustomButton from "../base/Button";
import "../../bootstrap/bootstrap.min.css";
// import "./SettingsModal.css";

export default class SettingsModal extends React.Component {
	constructor(props) {
		super(props);
		// this.connection.settings.
		this.state = {
			interval: this.props.connection.settings.interval,
			brightness: this.props.connection.settings.brightness,
			loading: true,
		};
	}

	render() {
		return (
			<Modal
				show={this.props.open}
				onHide={this.props.closeModal}
				onEnter={() => {
					this.setState({
						render: <Modal.Body></Modal.Body>,
					});
					this.props.connection
						.updateSettingsData()
						.then(() => {
							this.setState({
								interval: this.props.connection.settings.interval,
								brightness: this.props.connection.settings.brightness,
							});
							this.setState({
								loading: false,
							});
						})
						.catch((err) => {
							this.setState({
								err,
							});
							this.setState({
								loading: false,
							});
						});
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>Ustawienia</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h1 hidden={!this.state.err}>{this.state.err}</h1>
					<Spinner hidden={!this.state.loading || this.state.err} key={-1} animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
					<Container hidden={this.state.loading && this.state.err}>
						<p>Jasność</p>
						<Row>
							<Col sm={8} className="d-flex align-items-center">
								<Form.Control
									type="range"
									value={this.state.brightness}
									step={1}
									min={0}
									max={100}
									onChange={(event) => {
										this.setState({ brightness: event.target.value });
										this.props.connection.settings.brightness = event.target.value;
									}}
								/>
							</Col>
							<Col sm={4}>
								<Form.Control
									type="number"
									value={this.state.brightness}
									// margin="dense"
									onChange={(event) => {
										this.setState({ brightness: Number(event.target.value) });
										this.props.connection.settings.brightness = event.target.value;
									}}
									step={1}
									min={0}
									max={100}
								/>
							</Col>
						</Row>
					</Container>
					<Container hidden={this.state.loading && this.state.err}>
						<p>Interwał</p>
						<Row>
							<Col sm={8} className="d-flex align-items-center">
								<Form.Control
									type="range"
									value={this.state.interval}
									step={1}
									min={1}
									max={2048}
									onChange={(event) => {
										this.setState({ interval: event.target.value });
										this.props.connection.settings.interval = event.target.value;
									}}
								/>
							</Col>
							<Col sm={4}>
								<Form.Control
									type="number"
									value={this.state.interval}
									// margin="dense"
									onChange={(event) => {
										this.setState({ interval: Number(event.target.value) });
										this.props.connection.settings.interval = event.target.value;
									}}
									step={1}
									min={1}
									max={2048}
								/>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<CustomButton
						title="Zapisz"
						onclick={() => {
							this.props.connection.saveSettings();
						}}
					/>
					<CustomButton title="Zamknij" color="secondary" onclick={this.props.closeModal} />
				</Modal.Footer>
			</Modal>
		);
	}
}
