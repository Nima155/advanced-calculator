import React from "react";
import { IButton } from "./typeInterfaces";

export let ButtonComponent: React.FC<IButton> = ({
	themeStyle,
	text,
	onClick,
}) => {
	return (
		<button style={themeStyle} onClick={onClick}>
			<p>{text}</p>
		</button>
	);
};
