import {
	faArrowLeft,
	faArrowRight,
	faArrowRightFromBracket,
	faArrowTurnRight,
	faChevronLeft,
	faChevronRight,
	faFire,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOverlayContext } from "../../providers/SeachOverlayContext";
import { TrendingTagsContext } from "../../providers/TrendingTagsContext";
import { generateComponentKey } from "../../utils/generateComponentKey";
import "./../../styles/components/global/TrendingTags.scss";

export const TrendingTags = () => {
	const [tags, setTags] = useState([]);
	const { open, setOpen } = useContext(TrendingTagsContext);
	const search = useContext(SearchOverlayContext);
	const navigate = useNavigate();

	function goTo(path: string) {
		navigate(path);
	}

	useEffect(() => {
		console.log(open);
	}, [open]);

	useEffect(() => {
		fetch("/api/posts/trending")
			.then((r) => r.json())
			.then((d) => {
				setTags(d.data);
			});
	}, []);

	function openTag(tag: string) {
		search.setSearch(tag);

		if (window.location.pathname.split("/").pop() == "listing") {
			history.pushState({}, "", `/listing?query=${tag}`);
		} else {
			goTo(`/listing?query=${tag}`);
		}
	}

	return (
		<div
			className={"trending_tags_container"}
			key={generateComponentKey(10)}
			style={{
				marginLeft: `-${open ? 0 : 300}px`,
			}}>
			<div className="scrollable">
				<div className="title">
					<FontAwesomeIcon icon={faFire} />
					<p>Trending Tags</p>
				</div>
				{tags.map((t, i) => (
					<div
						className="tag"
						key={generateComponentKey(10)}
						onClick={() => {
							openTag(t.tag);
						}}>
						<span className="position">
							#{i + 1} <span className="size">({t.size})</span>
						</span>
						{t.tag}
					</div>
				))}
			</div>
			{!open ? (
				<div
					className="container action open-button"
					onClick={() => {
						setOpen(true);
					}}>
					<FontAwesomeIcon icon={faChevronRight} />
				</div>
			) : (
				<div
					className="container action close-button"
					onClick={() => {
						setOpen(false);
					}}>
					<FontAwesomeIcon icon={faChevronLeft} />
				</div>
			)}
		</div>
	);
};
