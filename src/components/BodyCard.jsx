import React from "react";
import Input from "../common/Input";
import Select from "../common/Select";

function BodyCard({ firstUnit, secondUnit, onInputChange, onTypeChange, optionSelect }) {
	return (
		<React.Fragment>
			<section id="converter-card">
				<div className="input-card">
					<Input
						type="number"
						value={firstUnit.value}
						placeholder={"sssss"}
						onChange={(value) => onInputChange(true, value)}
					></Input>
					<Select
						name="first"
						value={firstUnit.unit}
						optionSelect={optionSelect}
						onChange={(value) => onTypeChange(true, value)}
					/>
				</div>
				<span id="equal">=</span>
				<div className="input-card">
					<Input
						type="number"
						value={secondUnit.value}
						onChange={(value) => onInputChange(false, value)}
					></Input>
					<Select
						name="second"
						value={secondUnit.unit}
						optionSelect={optionSelect}
						onChange={(value) => onTypeChange(false, value)}
					/>
				</div>
			</section>
		</React.Fragment>
	);
}

export default BodyCard;
