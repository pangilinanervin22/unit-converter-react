import React, { useReducer } from "react";
import HeaderCard from "../HeaderCard";
import BodyCard from "../BodyCard";
import * as Converter from "units-converter";
import logo from "../../assets/react-logo.svg";

const intialState = {
	currentType: "length",
	first: { value: 1, unit: "cm" },
	second: { value: 0.1, unit: "m" },
};

function FunctionConverter() {
	const [state, dispatch] = useReducer(reducer, { intialState });

	return (
		<React.Fragment>
			<div className="App">
				<main>
					<img id="version-logo" src={logo} alt="react logo" />
					<HeaderCard value={state.intialState.currentType} onChange={changeMeasurement} />
					<BodyCard
						currentType={state.intialState.currentType}
						firstUnit={state.intialState.first}
						secondUnit={state.intialState.second}
						onInputChange={inputChange}
						onTypeChange={typeChange}
						optionSelect={getSelectArray(state.intialState.currentType)}
						onChange={(value) => dispatch({ type: "unit-change", unitType: value })}
					/>
				</main>
			</div>
		</React.Fragment>
	);

	function reducer(state, action) {
		const { currentType: currentTypeState, first: firstState, second: secondState } = state.intialState;

		switch (action.type) {
			case "unitChange":
				const defaultUnit = {
					first: action.currentUnitList[0].unit,
					second: action.currentUnitList[1].unit,
				};

				return {
					intialState: {
						currentType: action.currentType,
						first: {
							unit: defaultUnit.first,
							value: 1,
						},
						second: {
							unit: defaultUnit.second,
							value: changeValue(
								{ value: 1, unit: defaultUnit.first },
								{ unit: defaultUnit.second },
								action.currentType
							),
						},
					},
				};

			case "firstInputChange":
				return {
					intialState: {
						currentType: currentTypeState,
						first: { unit: firstState.unit, value: action.value },
						second: {
							unit: secondState.unit,
							value: changeValue(
								{ value: action.value, unit: firstState.unit },
								{ unit: secondState.unit },
								currentTypeState
							),
						},
					},
				};

			case "secondInputChange":
				return {
					intialState: {
						currentType: currentTypeState,
						second: { unit: secondState.unit, value: action.value },
						first: {
							unit: firstState.unit,
							value: changeValue(
								{ value: action.value, unit: secondState.unit },
								{ unit: firstState.unit },
								currentTypeState
							),
						},
					},
				};
			case "firstTypeChange":
				return {
					intialState: {
						currentType: currentTypeState,
						first: { ...firstState, unit: action.value },
						second: {
							unit: secondState.unit,
							value: changeValue(
								{ value: firstState.value, unit: action.value },
								{ unit: secondState.unit },
								currentTypeState
							),
						},
					},
				};
			case "secondTypeChange":
				return {
					intialState: {
						currentType: currentTypeState,
						first: { ...firstState },
						second: {
							unit: secondState.unit,
							value: changeValue({ ...firstState }, { unit: action.value }, currentTypeState),
						},
					},
				};
			default:
				throw new Error();
		}
	}

	function changeMeasurement(typeValue) {
		dispatch({
			type: "unitChange",
			currentType: typeValue,
			currentUnitList: getCurrentUnitArray(typeValue),
		});
	}

	function changeValue(baseUnit, changeUnit, currentType) {
		return Converter[currentType](baseUnit.value).from(baseUnit.unit).to(changeUnit.unit).value;
	}

	function inputChange(isFirstChange, value) {
		if (isFirstChange) dispatch({ type: "firstInputChange", value });
		else dispatch({ type: "secondInputChange", value });
	}

	function typeChange(isFirstChange, value) {
		if (isFirstChange) dispatch({ type: "firstTypeChange", value });
		else dispatch({ type: "secondTypeChange", value });
	}

	function getCurrentUnitArray(unit) {
		return Converter[unit]().list();
	}

	function getSelectArray(unit) {
		return getCurrentUnitArray(unit).map((item) => ({
			value: item.unit,
			label: `${item.plural} (${item.unit})`,
		}));
	}
}

export default FunctionConverter;
