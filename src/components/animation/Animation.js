import React from "react";
import { Form, Col, Row } from "react-bootstrap";
// import ReactDOM from "react-dom";

import "../../bootstrap/bootstrap.min.css";
// import "./Animation.css";
import CustomButton from "../base/Button";
import { Card } from "react-bootstrap";

class Animation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {color: "#FF0000", leds: 1, rotation: 1};
	}

	render() {
		return (
			<Card className="Animation-container" maxWidth="sm">
				<Card.Body>
					<Card.Header>{this.props.title}</Card.Header>
					{/* <Card.Img variant="top" alt="FOTO" src={this.props.foto} /> */}
					{/* <img className="Animation-image" src={this.props.foto}></img> */}
					<Card.Text>{this.props.desc}</Card.Text>
					<CustomButton onclick={()=>{this.props.onClick(this.state.leds, this.state.color, this.state.rotation)}} title={this.props.button_text} />
					{this.props.direction &&
							<CustomButton onclick={this.props.onDirectionClicked} title={this.props.button_direction_text} />
					}
					{this.props.rotation &&
						<Row>
							<Col>
								<p>Rotacja RGB:</p>
							</Col>
							<Col>
							<Form.Control
								type="number"
								value={this.state.rotation}
								step={1}
								min={1}
								max={359}
								placeholder={this.props.button_rotation_text}
								onChange={(event) => {
									// if(event.target.value <= this.props.leds && event.target.value > 0){
										this.setState({ rotation: event.target.value });
									// }
								}}
								onBlur={(event) => {
									if(event.target.value > 359){
										this.setState({ rotation: 359 });
									} else if(event.target.value <= 0){
										this.setState({ rotation: 0 });
									}
								}}
							/>
							</Col>
						</Row>
					}
					{this.props.leds &&
						<Row>
							<Col>
								<p>Zmiana ilości ledów:</p>
							</Col>
							<Col>
								<Form.Control
									type="number"
									value={this.state.leds}
									step={1}
									min={1}
									max={this.props.strip_leds}
									placeholder={this.props.button_leds_text}
									onChange={(event) => {
										// if(event.target.value <= this.props.leds && event.target.value > 0){
											this.setState({ leds: event.target.value });
										// }
									}}
									onBlur={(event) => {
										if(event.target.value > this.props.strip_leds){
											this.setState({ leds: this.props.strip_leds });
										} else if(event.target.value <= 0){
											this.setState({ leds: 0 });
										}
									}}
								/>
							</Col>
						</Row>
					}
					{this.props.color_change &&
						<Row>
							<Col>
								<p>Zmiana koloru:</p>
							</Col>
							<Col>
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
						// <CustomButton onclick={this.props.onColorClick} title={this.props.button_color_text} />
					}
				</Card.Body>
			</Card>
		);
	}
}

export default Animation;
