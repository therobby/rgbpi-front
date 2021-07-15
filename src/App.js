import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./bootstrap/bootstrap.min.css";
import ErrorAlert from "./components/alert/error/ErrorAlert";
// import "./App.css";
import Animations from "./components/animations/Animations";
import CustomNavbar from "./components/navbar/Navbar";
import SettingsModal from "./components/settings/SettingsModal";
import Connection from "./ConnectionManager";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { animations: ["Loading"], openSettings: false };

		this.connection = new Connection();
		this.buttonclicked.bind(this);
		this.onBrightnessChange.bind(this);
		this.onIntervalChange.bind(this);
	}

	componentDidMount() {
		this.connection.testConnection().then((test) => {
			if (test) {
				this.animations();
			} else {
				this.setState({ animations: ["Error"] });
			}
		});
	}

	buttonclicked() {
		console.log("Button clicked!");
	}

	animations() {
		this.connection.getModes().then((result) => {
			console.log({ modes: result.data });


			let data = result.data.data;
			let manual_index = -1;

			for(let i = 0; i < data.length; i++){
				if(data[i].s_name === "manual"){
					manual_index = i;
					break;
				}
			}

			if(manual_index >= 0){
				data.splice(manual_index, 1);
			}



			
			console.log({ anims: data });
			this.setState({ animations: result.data.data });

			// this.setState({ animations: Object.keys(result.data.data).map((key) => result.data.data[key]) });
		});
	}

	onBrightnessChange(brightness) {
		this.connection.setBrightness(brightness);
	}

	onIntervalChange(interval) {
		this.connection.setInterval(interval);
	}

	render() {
		return (
			<div className="App">
				<CustomNavbar
					off="Wyłącz"
					settings="Ustawienia"
					onOffClicked={() => {
						this.connection.switchOff().catch((err) => {});
					}}
					onSettingsClicked={() => {
						this.setState({ openSettings: true });
					}}
				/>
				<ErrorAlert
					onClose={() => {
						this.setState({ error: "" });
					}}
					error={this.state.error}
					open={this.state.error !== "" && this.state.error !== undefined}
				/>
				<Container>
					<Row>
						<Col>
							<SettingsModal
								open={this.state.openSettings}
								closeModal={() => {
									this.setState({ openSettings: false });
								}}
								connection={this.connection}
							/>
							<Animations
								connection={this.connection}
								animations={this.state.animations}
								error={(error) => {
									this.setState({ error });
									// this.setState({ animations: ["Error"] });
								}}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default App;
