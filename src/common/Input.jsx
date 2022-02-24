import React from "react";
import PropTypes from "prop-types";

function Input({ value, type, placeHolder, onChange }) {
	return (
		<React.Fragment>
			<input
				type={type}
				value={value}
				placeholder={placeHolder}
				onChange={(event) => onChange(event.target.value)}
			></input>
		</React.Fragment>
	);
}

Input.propTypes = {
	value: PropTypes.any.isRequired,
	type: PropTypes.string.isRequired,
	// onchange: PropTypes.string.isRequired,
};

Input.defaultProps = {
	type: "text",
	placeholder: "Fill",
};

export default Input;
