import { MouseEventHandler } from "react";

export type ThemeStyle = {
	color?: string;
	backgroundColor?: string;
	boxShadow?: string;
	fontSize?: string;
	gridArea?: string;
	borderRadius?: string;
	width?: string;
	height?: string;
	margin?: string;
	cursor?: string;
	transition?: string;
};

export interface IButton {
	themeStyle: ThemeStyle;
	text: string;
	onClick: MouseEventHandler;
	cls?: string;
}

export interface IAppState {
	displayText: string;
	currentThemeIndex: number;
	currentThemeStyles: {
		mainBackground: ThemeStyle;
		delAndRes: ThemeStyle;
		toggleKey: ThemeStyle;
		generalButtonStylings: ThemeStyle;
		toggleBackground: ThemeStyle;
		displayBackground: ThemeStyle;
		calcAndTheme: ThemeStyle;
	};
	// gridPositionNames: Map<string, string>;
	operatorPresent: boolean;
}
