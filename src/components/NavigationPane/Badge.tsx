import React from "react";

import styles from "./Badge.module.scss";

export default function Badge({ count }: { count: number }) {
	if (count > 0) {
		return (
			<div className={ styles.badge }>{ count }</div>
		);
	} else {
		return <></>;
	}
}