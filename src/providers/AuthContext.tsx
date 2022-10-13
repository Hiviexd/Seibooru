import React, { createContext, useState } from "react";

export interface ILoginUser {
	_id: string;
	accountToken: string;
	authenticated: boolean;
}

const defaultUser = JSON.stringify({
	_id: "-1",
	accountToken: "",
	authenticated: false,
});

function getStoredUser() {
	let user = JSON.parse(defaultUser);

	try {
		user = JSON.parse(localStorage["loginData"]);

		if (!user) return JSON.parse(defaultUser);

		if (typeof JSON.parse(localStorage["loginData"]) == "string")
			return JSON.parse(defaultUser); // Prevent stringified json output

		return user;
	} catch (e: any) {
		console.error(e);
		localStorage.removeItem("loginData");

		return JSON.parse(defaultUser);
	}
}

interface IUserContextType {
	login: ILoginUser;
	setLogin: (u) => any;
}

export const AuthContext = createContext<IUserContextType>({
	login: JSON.parse(defaultUser),
	setLogin: (u: ILoginUser) => void {},
});

const AuthProvider = ({ children }: any) => {
	const [login, _setLogin] = useState<ILoginUser>(getStoredUser());

	function setLogin(data: ILoginUser) {
		localStorage["loginData"] = JSON.stringify(data);
		_setLogin(data);
	}

	return (
		<AuthContext.Provider
			value={{
				login,
				setLogin,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
