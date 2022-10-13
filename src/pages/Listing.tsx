import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/global/Navbar";
import { PostSelector } from "../components/listing/PostSelector";
import "../styles/pages/Listing.scss";
import { generateComponentKey } from "../utils/generateComponentKey";
import { Pagination } from "@mui/material";
import { TrendingTags } from "../components/global/TrendingTags";
import { TrendingTagsContext } from "../providers/TrendingTagsContext";

export default function Listing() {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const trendingTagsContext = useContext(TrendingTagsContext);

	useEffect(() => {
		fetch(`/api/posts/listing?page=${page}`)
			.then((r) => r.json())
			.then((d) => {
				setPosts(d.data.posts);
				setTotalPages(d.data.totalPages);
			});
	}, []);

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
			</div>
		</>
	);
}
