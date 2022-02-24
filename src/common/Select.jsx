import React from "react";
import PropTypes from "prop-types";

export default function Select({ name, value, optionSelect, className, onChange }) {
	return (
		<React.Fragment>
			<div>
				<select
					id={name}
					name={name}
					value={value}
					className={className}
					onChange={(event) => onChange(event.target.value)}
				>
					{optionSelect.map((item) => (
						<option key={item.value} value={item.value}>
							{item.label}
						</option>
					))}
				</select>
			</div>
		</React.Fragment>
	);
}

Select.propTypes = {
	styles: PropTypes.string,
	value: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	optionSelect: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
};
