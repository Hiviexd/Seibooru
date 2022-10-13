import React, { createContext, useState } from "react";

interface ITrendingTags {
	open: boolean;
	setOpen: (open) => any;
}

export const TrendingTagsContext = createContext<ITrendingTags>({
	open: true,
	setOpen: (open: boolean) => void {},
});

const TrendingTagsProvider = ({ children }: any) => {
	const [open, setOpen] = useState<boolean>(true);

	return (
		<TrendingTagsContext.Provider
			value={{
				open,
				setOpen,
			}}>
			{children}
		</TrendingTagsContext.Provider>
	);
};

export default TrendingTagsProvider;
