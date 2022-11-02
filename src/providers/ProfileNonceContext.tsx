import React, { createContext, useState } from "react";
import { generateComponentKey } from "../utils/generateComponentKey";

interface IProfileNonce {
	string: string;
	setString: (string) => any;
}

export const ProfileNonceContext = createContext<IProfileNonce>({
	string: "",
	setString: (string: string) => void {},
});

const ProfileNonceProvider = ({ children }: any) => {
	const [string, setString] = useState(generateComponentKey(10));

	return (
		<ProfileNonceContext.Provider
			value={{
				string,
				setString,
			}}>
			{children}
		</ProfileNonceContext.Provider>
	);
};

export default ProfileNonceProvider;
