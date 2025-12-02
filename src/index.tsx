import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from '@virola/components';

const rootElement = document.getElementById('root');
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<Application />
		</React.StrictMode>
	);
}
