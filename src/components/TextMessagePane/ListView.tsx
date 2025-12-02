import React, {useRef, useEffect, useState, Children } from 'react';

import styles from './ListView.module.scss';

export const enum Direction {
	Forward = "forward",
	Backward = "backward"
}

interface ListViewProps extends React.PropsWithChildren {
	context: number;
	prevCursor: number;
	nextCursor: number;
	fetch: (cursor: number, direction: Direction) => Promise<void>;
	isSecondaryView?: boolean; // Used for discussion view
	ref?: React.RefObject<HTMLDivElement | null>;
}

export default function ListView({ context, prevCursor, nextCursor, fetch, children, isSecondaryView, ref }: ListViewProps) {
	const viewRef = ref ? ref : useRef<HTMLDivElement>(null);
	const [ getScrollPosition, setScrollPosition ] = useScrollPosition();

	var fetching = false;

	function fetchItems(prevCursor: number, nextCursor: number) {
		
		const view = viewRef.current;
		if (!view) {
			return;
		}

		const fetchPrevious = view.scrollTop < (view.scrollHeight - view.scrollTop - view.clientHeight);
		const direction = fetchPrevious ? Direction.Backward : Direction.Forward;
		const cursor = fetchPrevious ? prevCursor : nextCursor;

		if (!fetching) {
			fetching = true;

			fetch(cursor, direction).then(() => {
				fetching = false;
			});
		} 
			
	}

	function handleScroll(context: number, prevCursor: number, nextCursor: number) {
		const view = viewRef.current;
		if (view) {
			if (Math.abs(view.scrollTop) > (view.scrollHeight * 3) / 4) {
				fetchItems(prevCursor, nextCursor);
			}

			setScrollPosition(context, view.scrollTop);
		}
	};

	useEffect(() => {
		const listener = () => handleScroll(context, prevCursor, nextCursor);

		const view = viewRef.current;
		if (view) {
			view.addEventListener('scroll', listener);
		}

		return () => {
			if (view) {
				view.removeEventListener('scroll', listener);
			}
		};
	}, [context, prevCursor, nextCursor]);

	useEffect(() => {
		const view = viewRef.current;
		if (view) {
			const scrollPosition = getScrollPosition(context);
			if (scrollPosition) {
				view.scrollTop = scrollPosition;
			} 
		}

	}, [context]);

	const background = isSecondaryView ? styles.secondary : styles.primary;

	const reversedChildren = Children.toArray(children).reverse();
	
	return (
		<div className= {`${styles.listContainer} ${background}`}>
			<div key={context} className={ `${styles.listView}` } ref={viewRef}>{ reversedChildren }</div>
			<div className={styles.spacer} />
		</div>
	);
}


function useScrollPosition() : [(context: number) => number | undefined, (context: number, scrollPosition: number) => void] {
	const [ roomsScrollPosition, setRoomsScrollPosition ] = useState(new Map<number, number>());

	function getScrollPosition(context: number) {
		return roomsScrollPosition.get(context);
	}

	function setScrollPosition(context: number, scrollPosition: number) {
		setRoomsScrollPosition(prevState => new Map(prevState).set(context, scrollPosition));
	}

	return [ getScrollPosition, setScrollPosition ];
}
