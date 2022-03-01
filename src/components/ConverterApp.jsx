import React, { Component } from "react";
import HeaderCard from "./HeaderCard";
import BodyCard from "./BodyCard";
import * as Converter from "units-converter";

export default class ConverterApp extends Component {
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
						<img id="version-logo" src="../react-logo.svg" alt="react logo" />
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

	functionClass() {
		console.log(this.state);
	}

	changeMeasurement = (typeValue) => {
		const defaultUnit = {
			first: this.getCurrentUnitArray(typeValue)[0].unit,
			second: this.getCurrentUnitArray(typeValue)[1].unit,
		};

		this.setState({
			currentType: typeValue,
			first: { value: 1, unit: defaultUnit.first },
			second: {
				value: this.convertValue(
					{ value: 1, unit: defaultUnit.first },
					{ unit: defaultUnit.second },
					typeValue
				),
				unit: defaultUnit.second,
			},
		});
	};

	inputChange = (isFirstChange, value) => {
		const { first, second, currentType } = this.state;

		if (isFirstChange)
			this.setState({
				currentType,
				first: { unit: first.unit, value },
				second: {
					unit: second.unit,
					value: this.convertValue({ unit: first.unit, value }, { ...second }, currentType),
				},
			});
		else
			this.setState({
				currentType,
				second: { unit: second.unit, value },
				first: {
					unit: first.unit,
					value: this.convertValue({ unit: second.unit, value }, { ...first }, currentType),
				},
			});
	};

	typeChange = (isFirstChange, value) => {
		const { first, second, currentType } = this.state;

		if (isFirstChange)
			this.setState({
				first: { ...first, unit: value },
				second: {
					...second,
					value: this.convertValue({ ...first, unit: value }, { ...second }, currentType),
				},
			});
		else
			this.setState({
				second: { ...second, unit: value },
				first: {
					...first,
					value: this.convertValue({ ...second, unit: value }, { ...first }, currentType),
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
