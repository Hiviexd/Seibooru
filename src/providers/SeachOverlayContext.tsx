import React, { createContext, useState } from "react";

interface ISearchOverlay {
	open: boolean;
	search: string;
	setOpen: (open) => any;
	setSearch: (search) => any;
}

export const SearchOverlayContext = createContext<ISearchOverlay>({
	open: true,
	search: "",
	setOpen: (open: boolean) => void {},
	setSearch: (search: string) => void {},
});

const SearchOverlayProvider = ({ children }: any) => {
	const [open, setOpen] = useState<boolean>(true);
	const [search, setSearch] = useState("");

	return (
		<SearchOverlayContext.Provider
			value={{
				open,
				search,
				setOpen,
				setSearch,
			}}>
			{children}
		</SearchOverlayContext.Provider>
	);
};

export default SearchOverlayProvider;
