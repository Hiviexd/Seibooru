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
import { SearchOverlayContext } from "../providers/SeachOverlayContext";
import { SearchIndicator } from "../components/UI/SearchIndicator";
import ErrorPage from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";
import { NotificationsSidebar } from "../components/UI/NotificationsSidebar";

export default function Listing() {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const trendingTagsContext = useContext(TrendingTagsContext);
	const search = useContext(SearchOverlayContext);

	useEffect(() => {
		document.title = "Listing | Seibooru";
	}, [posts]);

	useEffect(() => {
		fetch(`/api/posts/listing?page=${page}&query=${search.search || ""}`)
			.then((r) => r.json())
			.then((d) => {
				setPosts(d.data.posts);
				setTotalPages(d.data.totalPages);
			});
	}, []);

	function refreshListing(query: string) {
		fetch(`/api/posts/listing?page=${page}&query=${query || ""}`)
			.then((r) => r.json())
			.then((d) => {
				setPosts(d.data.posts);
				setTotalPages(d.data.totalPages);
			});
	}

	useEffect(() => {
		if (!search.open) refreshListing(search.search);
	}, [search]);

	if (posts === null)
		return (
			<>
				<Navbar />
				<SearchOverlay />
				<LoadingPage />
			</>
		);

	return (
		<>
			<Navbar />
			<SearchOverlay />
			<NotificationsSidebar />
			<div className="listing_layout">
				<TrendingTags />
				<div
					className={"listing"}
					key={generateComponentKey(20)}
					style={{
						width: `${trendingTagsContext.open ? 75 : 100}%`,
					}}>
					<SearchIndicator />
					<div className="scroll">
						{posts.length == 0 ? (
							<ErrorPage text="There's no results for your search..." />
						) : (
							posts.map((post) => {
								return <PostSelector post={post} />;
							})
						)}
					</div>
					<Pagination
						count={totalPages}
						page={page}
						color="primary"
						onChange={(ev, value) => {
							setPage(value);
							refreshListing(search.search);
						}}
					/>
				</div>
				<PostButton />
			</div>
		</>
	);
}
