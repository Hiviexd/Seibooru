import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOverlayContext } from "../../providers/SeachOverlayContext";
import "./../../styles/components/UI/SearchOverlay.scss";

export function SearchOverlay() {
	const { open, setOpen, search, setSearch } = useContext(SearchOverlayContext);
	const navigate = useNavigate();
	const inputRef = useRef(null);

	function goTo(path: string) {
		navigate(path);
	}

	function handleKeyDown(ev: any) {
		if (ev.key == "Enter") {
			setOpen(false);
			execute();
		}
	}

	function handleSearchInput(ev: any) {
		setSearch(ev.target.value);

		if (ev.key == "Enter") {
			setOpen(false);
			execute();
		}
	}

	function handleSearch() {
		setOpen(false);
		execute();
	}

	function handleClose(ev: any) {
		if (ev.target.className == "search-overlay open") {
			setOpen(false);

			if (!search.trim()) {
				if (window.location.pathname.split("/").pop() == "listing") {
					history.pushState({}, "", `/listing`);
				}
			}
		}
	}

	function execute() {
		if (window.location.pathname.split("/").pop() == "listing") {
			history.pushState(
				{},
				"",
				search.trim() ? `/listing?query=${search}` : `/listing`
			);
		} else {
			if (!search.trim()) return;
			goTo(`/listing?query=${search}`);
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", (ev) => {
			if (ev.key == "Escape") setOpen(false);
		});
	}, []);

	useEffect(() => {
		inputRef.current.focus();
	}, [open]);

	return (
		<div
			className={open ? "search-overlay open" : "search-overlay"}
			onClick={handleClose}>
			<div className="search-container" onClick={handleClose}>
				<input
					ref={inputRef}
					type="text"
					value={search}
					placeholder="Search.."
					onInput={handleSearchInput}
					onKeyDown={handleKeyDown}></input>
				<div className="button" onClick={handleSearch}>
					<FontAwesomeIcon icon={faSearch} />
				</div>
			</div>
		</div>
	);
}
