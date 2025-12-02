import React, { useEffect } from "react";

import styles from './SplitterBar.module.scss';

export default function SplitterBar() {
	const splitterBarRef = React.useRef<HTMLDivElement>(null);

	let isDragging = false;

	useEffect(() => {
		const splitterBar = splitterBarRef.current;
		if (splitterBar) {
			const onMouseMove = (event: MouseEvent) => {
				if (isDragging) {				
					const root = document.documentElement;
					const minHeight = 50;
					const maxHeight = root.clientHeight * 3 / 4;
					const splitterTop = root.clientHeight - Math.min(maxHeight, Math.max(minHeight, root.clientHeight - event.clientY));

					root.style.setProperty('--vc-text-messenger-splitter-pos', `${splitterTop}px`);

					localStorage.setItem('textMessengerSplitterPos', `${splitterTop}`);
				}
			};

			const onMouseUp = () => {
				isDragging = false;
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", onMouseUp);
			};

			splitterBar.addEventListener("mousedown", (event) => {
				isDragging = true;
				document.addEventListener("mousemove", onMouseMove);
				document.addEventListener("mouseup", onMouseUp);
			});

			const savedPos = localStorage.getItem('textMessengerSplitterPos');
			if (savedPos) {
				const root = document.documentElement;
				root.style.setProperty('--vc-text-messenger-splitter-pos', `${savedPos}px`);
			}

			return () => {
				splitterBar.removeEventListener("mousedown", () => { });
			};
		}
	}, []);

	return <div className={styles.splitterBar} ref={splitterBarRef}></div>;
}