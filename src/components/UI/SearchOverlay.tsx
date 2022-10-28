import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { SearchOverlayContext } from "../../providers/SeachOverlayContext";
import "./../../styles/components/UI/SearchOverlay.scss";

export function SearchOverlay() {
	const { open, setOpen, search, setSearch } = useContext(SearchOverlayContext);

	function handleKeyDown(ev: any) {
		if (ev.key == "Enter") setOpen(false);
		history.pushState({}, "", `/listing?query=${search}`);
	}

	function handleSearchInput(ev: any) {
		setSearch(ev.target.value);

		if (ev.key == "Enter") setOpen(false);
	}

	function handleSearch() {
		setOpen(false);

		history.pushState({}, "", `/listing?query=${search}`);
	}

	return (
		<div className={open ? "search-overlay open" : "search-overlay"}>
			<div className="search-container">
				<input
					type="text"
					placeholder="Type here..."
					onInput={handleSearchInput}
					onKeyDown={handleKeyDown}
				/>
				<div className="button" onClick={handleSearch}>
					<FontAwesomeIcon icon={faSearch} />
				</div>
			</div>
		</div>
	);
}
