import React from "react";
import PropTypes from "prop-types";
import Input from "./../common/Input";
import Select from "../common/Select";

function ConverterCard({ firstUnit, secondUnit, onInputChange, onTypeChange, optionSelect }) {
	console.log(firstUnit, secondUnit);
	return (
		<React.Fragment>
			<section id="converter-card">
				<div className="input-card">
					<Input
						type="number"
						value={firstUnit.value}
						placeHolder={"first"}
						onChange={(e) => onInputChange(true, e)}
					></Input>
					<Select
						name="first"
						value={firstUnit.unit}
						optionSelect={optionSelect}
						onChange={(e) => onTypeChange(true, e)}
					/>
				</div>
				<span id="equal">=</span>
				<div className="input-card">
					<Input
						type="number"
						value={secondUnit.value}
						placeHolder={"second"}
						onChange={(e) => onInputChange(false, e)}
					></Input>
					<Select
						name="second"
						value={secondUnit.unit}
						optionSelect={optionSelect}
						onChange={(e) => onTypeChange(false, e)}
					/>
				</div>
			</section>
		</React.Fragment>
	);
}

ConverterCard.propTypes = {};

export default ConverterCard;
