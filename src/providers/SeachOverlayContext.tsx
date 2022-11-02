import React, { createContext, useEffect, useState } from "react";

interface ISearchOverlay {
	open: boolean;
	search: string;
	setOpen: (open) => any;
	setSearch: (search) => any;
}

export const SearchOverlayContext = createContext<ISearchOverlay>({
	open: false,
	search: "",
	setOpen: (open: boolean) => void {},
	setSearch: (search: string) => void {},
});

const SearchOverlayProvider = ({ children }: any) => {
	const [open, setOpen] = useState<boolean>(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const query = new URLSearchParams(window.location.search).get("query");

		if (query) {
			if (query.trim() == "") return;

			setSearch(query.trim());
		}
	}, []);

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
