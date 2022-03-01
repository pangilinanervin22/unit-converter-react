import React from "react";
import PropTypes from "prop-types";
import Select from "../common/Select";

const options = [
	{ value: "length", label: "Length" },
	{ value: "mass", label: "Mass" },
	{ value: "area", label: "Area" },
	{ value: "temperature", label: "Temperature" },
	{ value: "volume", label: "Volume" },
	{ value: "speed", label: "Speed" },
	{ value: "time", label: "Time" },
	{ value: "frequency", label: "Frequency" },
	{ value: "voltage", label: "Voltage" },
	{ value: "force", label: "Force" },
	{ value: "pressure", label: "Pressure" },
];

function HeaderCard({ onChange, value }) {
	return (
		<React.Fragment>
			<header id="header-card">
				<h1>Unit Converter</h1>
				<Select
					name="input"
					className="header-input"
					value={value}
					onChange={onChange}
					optionSelect={options}
				/>
			</header>
		</React.Fragment>
	);
}

HeaderCard.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};

export default HeaderCard;
