import React, { Component } from "react";
import HeaderCard from "../HeaderCard";
import BodyCard from "../BodyCard";
import * as Converter from "units-converter";

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
				value: this.changeValue(
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
				first: { ...first, value },
				second: {
					...second,
					value: this.changeValue({ ...first, value }, { ...second }, currentType),
				},
			});
		else
			this.setState({
				currentType,
				second: { ...second, value },
				first: {
					...first,
					value: this.changeValue({ ...second, value }, { ...first }, currentType),
				},
			});
	};

	typeChange = (isFirstChange, value) => {
		const { first, second, currentType } = { ...this.state };

		if (isFirstChange)
			this.setState({
				first: { ...first, unit: value },
				second: {
					...second,
					value: this.changeValue({ ...first, unit: value }, { ...second }, currentType),
				},
			});
		else
			this.setState({
				second: { ...second, unit: value },
				first: {
					...first,
					value: this.changeValue({ ...second, unit: value }, { ...first }, currentType),
				},
			});
	};

	getCurrentUnitArray = (unit) => {
		return Converter[unit]().list();
	};

	changeValue(baseUnit, changeUnit, currentType) {
		return Converter[currentType](baseUnit.value).from(baseUnit.unit).to(changeUnit.unit).value;
	}

	getSelectArray(unit) {
		return Converter[unit]()
			.list()
			.map((item) => ({
				value: item.unit,
				label: `${item.plural} (${item.unit})`,
			}));
	}
}
