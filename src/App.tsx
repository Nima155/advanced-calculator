import React, { MouseEventHandler, ReactElement, createContext } from "react";
import { ThemeStyle, IAppState } from "./typeInterfaces";
import { arr as stylesArray } from "./styles";
import { Spring, animated } from "react-spring";
import "./App.css";
import { ButtonComponent } from "./ButtonComponent";
import { DisplayComponent } from "./DisplayComponent";

// we have themes toggle -> conditional styling
// we have buttons
// we have display
const MyContext = React.createContext(null);
const GLOBAL_OPERATORS = "=+/*-";
const MAP_LOOKUP = new Map<string, string>([
	["7", "seven"],
	["8", "eight"],
	["9", "nine"],
	["1", "one"],
	["2", "two"],
	["3", "three"],
	["4", "four"],
	["5", "five"],
	["6", "six"],
	["del", "del"],
	["=", "equal"],
	["reset", "reset"],
	["0", "zero"],
	["/", "slash"],
	["-", "minus"],
	["+", "plus"],
	[".", "period"],
	["x", "cross"],
]);

function ButtonFactory(
	themeStyle: ThemeStyle,
	onClick: (i: string) => void
): Array<ReactElement> {
	const ans: Array<ReactElement> = [];
	for (let i = 0; i <= 9; i++) {
		ans.push(
			<ButtonComponent
				themeStyle={{ ...themeStyle, gridArea: MAP_LOOKUP.get(i + "") }}
				onClick={() => onClick(i + "")}
				key={i}
				text={i + ""}
			/>
		);
	}
	return ans;
}

function parseArgument(i: string, text: string): string {
	return (text.length == 0 ||
		GLOBAL_OPERATORS.includes(text[text.length - 1])) &&
		GLOBAL_OPERATORS.includes(i)
		? ""
		: i;
}

class App extends React.Component<{}, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			displayText: "",
			operatorPresent: false,
			currentThemeIndex: 0,
			currentThemeStyles: stylesArray[0],
			// "seven eight nine del"
			// "four five six plus"
			// "one two three minus"
			// "period zero slash cross"
			// "reset reset equal equal";
		};
	}
	onEqual() {
		this.setState((state) => ({
			displayText: state.displayText
				? (+Number.parseFloat(eval(state.displayText)).toFixed(3)).toString()
				: "",
			operatorPresent: false,
		}));
	}

	onReset() {
		this.setState({
			displayText: "",
			operatorPresent: false,
		});
	}
	onClick(i: string) {
		let pres = false;
		// console.log(i);
		i = parseArgument(i, this.state.displayText);

		if (!i || (this.state.displayText == "0" && i == "0")) return;

		if (this.state.operatorPresent && GLOBAL_OPERATORS.includes(i)) {
			this.setState((state) => ({
				displayText: (+Number.parseFloat(eval(state.displayText)).toFixed(
					3
				)).toString(),
				operatorPresent: false,
			}));
			pres = true;
		}
		this.setState((state) => ({
			displayText: state.displayText + i,
		}));
		this.setState((state) => ({
			operatorPresent:
				(GLOBAL_OPERATORS.includes(i) || state.operatorPresent) && !pres,
		}));
	}
	onToggle() {
		this.setState((state) => ({
			currentThemeIndex:
				state.currentThemeIndex + 1 == 3 ? 0 : state.currentThemeIndex + 1,
		}));
		this.setState((state) => ({
			currentThemeStyles: stylesArray[state.currentThemeIndex],
		}));
	}
	onDelete() {
		this.setState((state) => ({
			displayText: state.displayText
				? state.displayText.slice(0, state.displayText.length - 1)
				: state.displayText,
		}));
	}
	render() {
		const mainBackground: ThemeStyle =
			this.state.currentThemeStyles.mainBackground;
		const generalButtonStyles: ThemeStyle =
			this.state.currentThemeStyles.generalButtonStylings;
		const displayBackground: ThemeStyle =
			this.state.currentThemeStyles.displayBackground;
		const toggleKey: ThemeStyle = this.state.currentThemeStyles.toggleKey;
		const delAndRes: ThemeStyle = this.state.currentThemeStyles.delAndRes;
		const toggleBackground: ThemeStyle =
			this.state.currentThemeStyles.toggleBackground;
		const calcAndThem: ThemeStyle = this.state.currentThemeStyles.calcAndTheme;

		return (
			<div className="App" style={mainBackground}>
				<div className="calc-face">
					<div className="theme-part" style={mainBackground}>
						<h1 style={{ fontSize: "1.5rem", marginTop: 10, ...calcAndThem }}>
							calc
						</h1>
						<div className="theme-selector">
							<p
								className="theme-text"
								style={{ fontSize: 11, ...calcAndThem }}
							>
								Theme
							</p>
							<ul className="numbers" style={calcAndThem}>
								<li>1</li>
								<li>2</li>
								<li>3</li>
							</ul>

							<div className="toggle" style={toggleBackground}>
								<Spring
									from={{
										transform: "translateX(0px)",
									}}
									to={{
										transform:
											this.state.currentThemeIndex == 1
												? "translateX(15px)"
												: this.state.currentThemeIndex == 2
												? "translateX(31px)"
												: "translateX(0px)",
									}}
								>
									{(props: any) => (
										<animated.button
											style={{
												...props,
												...toggleKey,
												boxShadow: "0",
												width: "12px",
												height: "12px",
												margin: "4px",
												borderRadius: "6px",
												cursor: "pointer",
											}}
											onClick={() => this.onToggle()}
										></animated.button>
									)}
								</Spring>
							</div>
						</div>
					</div>
					<div
						className="display"
						style={{
							...displayBackground,
							fontSize: 32,
							color: calcAndThem.color || "black",
						}}
					>
						<DisplayComponent
							text={this.state.displayText}
							ops={this.state.operatorPresent}
						/>
					</div>
					<div className="buttons" style={toggleBackground}>
						{ButtonFactory(generalButtonStyles, (arg) => this.onClick(arg))}
						<ButtonComponent
							themeStyle={{
								...toggleKey,
								gridArea: MAP_LOOKUP.get("="),
								height:
									window.innerWidth < 376 ? "60px" : "clamp(40px,42px,70px)",
							}}
							onClick={() => this.onEqual()}
							text="="
						/>
						<ButtonComponent
							themeStyle={{
								...delAndRes,
								gridArea: MAP_LOOKUP.get("reset"),
								height:
									window.innerWidth < 376 ? "60px" : "clamp(40px,42px,70px)",
							}}
							onClick={() => this.onReset()}
							text="RESET"
						/>
						<ButtonComponent
							themeStyle={{
								...delAndRes,
								gridArea: MAP_LOOKUP.get("del"),
							}}
							onClick={() => this.onDelete()}
							text="DEL"
						/>
						<ButtonComponent
							themeStyle={{
								...generalButtonStyles,
								gridArea: MAP_LOOKUP.get("/"),
							}}
							onClick={() => this.onClick("/")}
							text="/"
						/>
						<ButtonComponent
							themeStyle={{
								...generalButtonStyles,
								gridArea: MAP_LOOKUP.get("+"),
							}}
							onClick={() => this.onClick("+")}
							text="+"
						/>
						<ButtonComponent
							themeStyle={{
								...generalButtonStyles,
								gridArea: MAP_LOOKUP.get("-"),
							}}
							onClick={() => this.onClick("-")}
							text="-"
						/>
						<ButtonComponent
							themeStyle={{
								...generalButtonStyles,
								gridArea: MAP_LOOKUP.get("."),
							}}
							onClick={() =>
								this.onClick(
									this.state.displayText.indexOf(".") == -1 ? "." : ""
								)
							}
							text="."
						/>
						<ButtonComponent
							themeStyle={{
								...generalButtonStyles,
								gridArea: MAP_LOOKUP.get("x"),
							}}
							onClick={() => this.onClick("*")}
							text="x"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
