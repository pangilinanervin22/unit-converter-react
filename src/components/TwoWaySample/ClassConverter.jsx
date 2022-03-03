import React, { Component } from "react";
import HeaderCard from "../HeaderCard";
import BodyCard from "../BodyCard";
import * as Converter from "units-converter";
import logo from "../../assets/react-logo.svg";

export default class ClassConverter extends Component {
	state = {
		currentType: "length",
		first: { value: 1, unit: "cm" },
		second: { value: 0.1, unit: "m" },
	};

	render() {
		const { currentType, first, second } = this.state;
		return (
			<React.Fragment>
				<div className="App">
					<main>
						<img id="version-logo" src={logo} alt="react logo" />
						<HeaderCard value={currentType} onChange={this.changeMeasurement} />
						<BodyCard
							currentType={currentType}
							firstUnit={first}
							secondUnit={second}
							onInputChange={this.inputChange}
							onTypeChange={this.typeChange}
							optionSelect={this.getSelectArray(currentType)}
							onChange={(value) => this.setState({ currentType: value })}
						/>
					</main>
				</div>
			</React.Fragment>
		);
	}

	changeMeasurement = (inputValue) => {
		const defaultUnit = {
			first: this.getCurrentUnitArray(inputValue)[0].unit,
			second: this.getCurrentUnitArray(inputValue)[1].unit,
		};

		this.setState({
			currentType: inputValue,
			first: { value: 1, unit: defaultUnit.first },
			second: {
				value: this.convertValue(
					{ value: 1, unit: defaultUnit.first },
					{ unit: defaultUnit.second },
					inputValue
				),
				unit: defaultUnit.second,
			},
		});
	};

	inputChange = (isFirstChange, inputValue) => {
		const { first, second, currentType } = this.state;

		if (isFirstChange)
			this.setState({
				currentType,
				first: { unit: first.unit, value: inputValue },
				second: {
					unit: second.unit,
					value: this.convertValue(
						{ unit: first.unit, value: inputValue },
						{ ...second },
						currentType
					),
				},
			});
		else
			this.setState({
				currentType,
				second: { unit: second.unit, value: inputValue },
				first: {
					unit: first.unit,
					value: this.convertValue(
						{ unit: second.unit, value: inputValue },
						{ ...first },
						currentType
					),
				},
			});
	};

	typeChange = (isFirstChange, inputValue) => {
		const { first, second, currentType } = this.state;

		if (isFirstChange)
			this.setState({
				first: { value: first.value, unit: inputValue },
				second: {
					unit: second.unit,
					value: this.convertValue(
						{ value: first.value, unit: inputValue },
						{ ...second },
						currentType
					),
				},
			});
		else
			this.setState({
				first: { ...first },
				second: {
					unit: inputValue,
					value: this.convertValue({ ...first }, { unit: inputValue }, currentType),
				},
			});
	};

	convertValue(baseUnit, changeUnit, currentType) {
		return Converter[currentType](baseUnit.value).from(baseUnit.unit).to(changeUnit.unit).value;
	}

	getCurrentUnitArray(unit) {
		return Converter[unit]().list();
	}

	getSelectArray(unit) {
		return this.getCurrentUnitArray(unit).map((item) => ({
			value: item.unit,
			label: `${item.plural} (${item.unit})`,
		}));
	}
}
