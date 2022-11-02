import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useContext } from "react";
import { SearchOverlayContext } from "../../providers/SeachOverlayContext";
import "./../../styles/components/UI/SearchIndicator.scss";

export function SearchIndicator() {
	const search = useContext(SearchOverlayContext);

	if (search.open == true && new URLSearchParams(location.search).get("query"))
		return <></>;

	if (search.search.split(",").filter((r) => r.trim() != "").length == 0)
		return <></>;

	function cancelSearch() {
		search.setSearch("");

		if (window.location.pathname.split("/").pop() == "listing") {
			history.pushState({}, "", `/listing`);
		}
	}

	return (
		<div className="search-indicator">
			<p className="title">Search results</p>
			<div className="tags">
				{search.search.split(",").map((tag) => (
					<div className="tag">{tag.trim()}</div>
				))}
				<div className="cancel-search" onClick={cancelSearch}>
					<FontAwesomeIcon icon={faTimesCircle} />
					Cancel
				</div>
			</div>
		</div>
	);
}
