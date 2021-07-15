import React from "react";
import { Spinner } from "react-bootstrap";
import Animation from "../animation/Animation.js";
import ManualLed from "../manual/ManualLed.js";
import "../../bootstrap/bootstrap.min.css";

export default class Animations extends React.Component {
	constructor(props) {
		super(props);

		this.state = { openManual: false };
	}

	render() {
		return (
			<>
				{Array.from(this.props.animations).map((animation, index) => {
					console.log({ a: animation, i: index });
					switch (animation) {
						case "Loading":
							return (
								<Spinner key={-1} animation="border" role="status">
									<span className="sr-only">Loading...</span>
								</Spinner>
							);
						case "Error":
							return <p key={-2}>Connection Failed</p>;
						default:
							return (
								<Animation
									key={index}
									onClick={(l, c, r) => {
										let data = {};
										if(animation.rotation_change){
											data["rotation"] = r;
										}
										if(animation.leds_change && l > 0){
											data["leds"] = l;
										}
										if(animation.color_change){
											data["color"] = c;
										}
										this.props.connection.setMode(animation.s_name, data).catch((err) => {
											this.props.error(err);
										});
									}}
									onDirectionClicked={()=>{
										let data = {};
										if(animation.direction_change){
											data["direction"] = 1;
										}
										this.props.connection.setMode(animation.s_name, data).catch((err) => {
											this.props.error(err);
										});

									}}
									title={animation.name}
									button_text="Włącz"
									desc={animation.desc}
									strip_leds={this.props.connection.leds}
									rotation={animation.rotation_change}
									leds={animation.leds_change}
									direction={animation.direction_change}
									color_change={animation.color_change}
									button_direction_text="Zmiana kierunku"
								/>
							);
					}
				})}
				{Array.from(this.props.animations).length > 1 && (
					<Animation
						onClick={() => {
							this.setState({ openManual: true });
						}}
						strip_leds={this.props.connection.leds}
						title="Manual"
						button_text="Otwórz okno"
						desc="Manualnie zmień kolor ledów"
					/>
				)}
				<ManualLed
					open={this.state.openManual}
					leds={this.props.connection.leds}
					closeModal={() => {
						this.setState({ openManual: false });
					}}
					saveSingle={(led, color) => {
						this.props.connection.saveManualSingle(led, color);
					}}
					saveAll={(color) => {
						this.props.connection.saveManualAll(color);
					}}
				/>
			</>
		);
	}
}
