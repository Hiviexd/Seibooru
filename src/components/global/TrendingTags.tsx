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
import { TrendingTagsContext } from "../../providers/TrendingTagsContext";
import { generateComponentKey } from "../../utils/generateComponentKey";
import "./../../styles/components/global/TrendingTags.scss";

export const TrendingTags = () => {
	const [tags, setTags] = useState([]);
	const { open, setOpen } = useContext(TrendingTagsContext);

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

	return (
		<div
			className={"trending_tags_container"}
			key={generateComponentKey(10)}
			style={{
				marginLeft: `-${open ? 0 : 290}px`,
			}}>
			<div className="scrollable">
				<div className="title">
					<FontAwesomeIcon icon={faFire} />
					<p>Trending Tags</p>
				</div>
				{tags.map((t, i) => (
					<div className="tag" key={generateComponentKey(10)}>
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
