import Axios from "axios";

export default class Connection {
	constructor() {
		this.server = 'http://rgbpi'; //"http://192.168.1.15"; // ip
		this.animationPort = 4050;
		// this.websocketPort = 4002; // TODO

		this.settings = { brightness: -1, interval: -1 };
		this.animLink = this.server + ":" + this.animationPort;
		this.timeout = 5000;
		this.leds = 0;

		this.hexToRgb = (hex) =>
			hex
				.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => "#" + r + r + g + g + b + b)
				.substring(1)
				.match(/.{2}/g)
				.map((x) => parseInt(x, 16));
	}

	getSettings() {
		return this.settings;
	}

	testConnection() {
		return new Promise(async (res, rej) => {
			try {
				let t = await Axios({
					url: this.animLink + "/data",
					method: "GET",
					mode: "no-cors",
					timeout: this.timeout,
					// withCredentials: true,
					// body:
				}); 
				// .then((result) => {
					console.log({tet: t});
				// 	if (result.data === "HI!") {
				// 		this.updateSettingsData();
				// 		res(true);
				// 	} else {
				// 		res(false);
				// 	}
				// })
				// .catch((err) => {
				// 	console.error(err);
				// 	res(false);
				// });
				if (t.data.data && t.data.data.drivers && t.data.data.drivers.name && t.data.data.drivers.leds) {
					this.leds = t.data.data.drivers.leds;
					this.updateSettingsData()
						.then(() => {
							res(true);
						})
						.catch(() => {
							res(false);
						});
				} else {
					res(false);
				}
			} catch (err) {
				res(false);
			}
		});
	}

	getModes() {
		return Axios({
			url: this.animLink + "/animation",
			method: "GET",
			mode: "no-cors",
			timeout: this.timeout,
			// withCredentials: true,
			// body:
		});
	}

	setMode(s_name, _data = {}) {
		if(_data.color){
			let rgb = this.hexToRgb(_data.color);
			_data.color = {r: rgb[0], g: rgb[1], b: rgb[2]}
		}
		return Axios({
			url: this.animLink + "/animation",
			method: "POST",
			mode: "no-cors",
			timeout: this.timeout,
			// withCredentials: true,
			data: {
				type: "Animation",
				name: s_name,
				data: _data
			},
		});
	}

	switchOff() {
		return Axios({
			url: this.animLink + "/off",
			method: "GET",
			mode: "no-cors",
			timeout: this.timeout,
			// withCredentials: true,
		});
	}

	updateSettingsData() {
		return Axios({
			url: this.animLink + "/settings",
			method: "GET",
			mode: "no-cors",
			timeout: this.timeout,
			// withCredentials: true,
			// body:
		}).then((result) => {
			console.log(result.data.data);
			this.settings.brightness = result.data.data.brightness;
			this.settings.interval = result.data.data.fps;
		});
	}

	saveSettings() {
		return Axios({
			url: this.animLink + "/settings",
			method: "POST",
			mode: "no-cors",
			timeout: this.timeout,
			// withCredentials: true,
			data: {
				type: "Settings",
				data: {
					brightness: this.settings.brightness,
					fps: this.settings.interval,
				}
			},
		});
	}

	saveManualSingle(led, color) {
		let rgb = this.hexToRgb(color);
		return Axios({
			url: this.animLink + "/animation",
			method: "POST",
			mode: "no-cors",
			timeout: this.timeout,
			// withCredentials: true,
			data: {
				type: "Animation",
				name: "manual",
				data: {
					index: led - 1,
					color: {r: rgb[0], g: rgb[1], b: rgb[2]}
				}
			},
		});
	}

	saveManualAll(color) {
		let rgb = this.hexToRgb(color);
		return Axios({
			url: this.animLink + "/animation",
			method: "POST",
			mode: "no-cors",
			timeout: this.timeout,
			// withCredentials: true,
			data: {
				type: "Animation",
				name: "manual",
				data: {
					color: {r: rgb[0], g: rgb[1], b: rgb[2]}
				}
			},
		});
	}
}
