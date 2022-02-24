import React from "react";
import PropTypes from "prop-types";
import Select from "../common/Select";

const options = [
	{ value: "length", label: "length" },
	{ value: "mass", label: "mass" },
	{ value: "area", label: "area" },
	{ value: "temperature", label: "temperature" },
	{ value: "volume", label: "volume" },
	{ value: "speed", label: "speed" },
	{ value: "time", label: "time" },
	{ value: "frequency", label: "frequency" },
	{ value: "voltage", label: "voltage" },
	{ value: "force", label: "force" },
	{ value: "pressure", label: "pressure" },
];

function HeaderCard({ onChange, value }) {
	return (
		<React.Fragment>
			<header className="App-header">
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
