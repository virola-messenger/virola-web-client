import React, { useEffect } from 'react';
import './Application.module.scss';
import { ModelProvider, AuthStatus } from '@virola/model';
import { MainPage, LoginPage } from '@virola/components';
import { useAuthStatus } from '@virola/controller';


export default function Application() {
	return (
		<ModelProvider>
			<RootPage/>
		</ModelProvider>
	);
};

function RootPage() {
	const status = useAuthStatus();

	switch (status) {
		case AuthStatus.Unknown:
			return <div>Loading...</div>;
		case AuthStatus.LoggedIn:
			return <MainPage/>;
		case AuthStatus.LoggedOut:
			return <LoginPage/>;
		default:
			return <div>Unknown status</div>;
	}
}
