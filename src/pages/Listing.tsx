import { useState, useEffect, useContext } from "react";
import Navbar from "../components/global/Navbar";
import { PostSelector } from "../components/listing/PostSelector";
import "../styles/pages/Listing.scss";
import { generateComponentKey } from "../utils/generateComponentKey";
import { Pagination } from "@mui/material";
import { TrendingTags } from "../components/global/TrendingTags";
import { TrendingTagsContext } from "../providers/TrendingTagsContext";
import { PostButton } from "../components/UI/PostButton";
import { useParams } from "react-router-dom";
import { SearchOverlay } from "../components/UI/SearchOverlay";

export default function Listing() {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const trendingTagsContext = useContext(TrendingTagsContext);
	const { query } = useParams();

	useEffect(() => {
		fetch(`/api/posts/listing?page=${page}&query=${query || ""}`)
			.then((r) => r.json())
			.then((d) => {
				setPosts(d.data.posts);
				setTotalPages(d.data.totalPages);
			});
	}, [query]);

	function refreshListing(page: number) {
		fetch(`/api/posts/listing?page=${page}`)
			.then((r) => r.json())
			.then((d) => {
				setPosts(d.data.posts);
				setTotalPages(d.data.totalPages);
			});
	}

	return (
		<>
            <Navbar />
			<SearchOverlay />
			<div className="listing_layout">
				<TrendingTags />
				<div
					className={"listing"}
					key={generateComponentKey(20)}
					style={{
						width: `${trendingTagsContext.open ? 75 : 100}%`,
					}}>
					<div className="scroll">
						{posts.map((post) => (
							<PostSelector post={post} />
						))}
					</div>
					<Pagination
						count={totalPages}
						page={page}
						color="primary"
						onChange={(ev, value) => {
							setPage(value);
							refreshListing(value);
						}}
					/>
				</div>
				<PostButton />
			</div>
		</>
	);
}
