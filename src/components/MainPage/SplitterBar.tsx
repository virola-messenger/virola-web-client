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
					const minWidth = 200;
					const maxWidth = root.clientWidth * 3 / 4;
					const splitterPos = Math.min(maxWidth, Math.max(minWidth, event.clientX));

					root.style.setProperty('--vc-left-sidebar-width', `${splitterPos}px`);

					localStorage.setItem('mainPageSplitterPos', `${splitterPos}`);
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

			const savedPos = localStorage.getItem('mainPageSplitterPos');
			if (savedPos) {
				const root = document.documentElement;
				root.style.setProperty('--vc-left-sidebar-width', `${savedPos}px`);
			}

			return () => {
				splitterBar.removeEventListener("mousedown", () => { });
			};
		}
	}, []);

	return <div className={styles.splitterBar} ref={splitterBarRef}></div>;
}