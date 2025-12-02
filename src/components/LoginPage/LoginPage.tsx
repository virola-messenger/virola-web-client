import React from "react";
import { useNetwork } from "@virola/network";
import { ActionType, useModel } from "@virola/model";

import styles from "./LoginPage.module.scss";

export default function LoginPage() {
	const network = useNetwork();
	const [, dispatch] = useModel();

	async function login(formData: FormData) {
		const userName = formData.get("userName") as string;
		const password = formData.get("password") as string;	

		const response = await network.login(userName, password);
		if (response.httpStatusCode === 200) {
			dispatch({ type: ActionType.SetMyUserId, userId: response.userId });
		} 
	}

	return (
		<div className={ styles.loginPage }>
			<div className={ styles.loginForm }>
				<h4 className={ styles.title }>Welcome to Virola</h4>
				<form action={login}>
					<input type="text" id="username" name="userName" placeholder="Username" required/><br/>
					<input type="password" id="password" name="password" placeholder="Password" required/><br/>
					<input type="submit" value="Login" autoFocus/>
				</form>
			</div>
		</div>
	);

}
