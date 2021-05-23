import React from "react";

export function DisplayComponent(props: { ops: boolean; text: string }) {
	return (
		<p>
			{!props.ops && props.text
				? parseFloat(props.text).toLocaleString("en")
				: props.text
				? props.text
				: "0"}
		</p>
	);
}
