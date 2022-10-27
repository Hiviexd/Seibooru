import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import { PostSelector } from "../components/listing/PostSelector";
import "../styles/pages/Post.scss";
import { generateComponentKey } from "../utils/generateComponentKey";
import { Pagination } from "@mui/material";
import { TrendingTags } from "../components/global/TrendingTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { LikeButton } from "../components/UI/LikeButton";

export default function Post() {
	const [postData, setPostData] = useState<any>();
	const postId = new URLSearchParams(location.search).get("post");

	useEffect(() => {
		fetch(`/api/posts/${postId}`)
			.then((r) => r.json())
			.then((d) => {
				setPostData(d.data);
			});
	}, []);

	if (!postData) return <></>;

	return (
		<>
			<Navbar />
			<div className="post_page_layout">
				<TrendingTags />
				<div className="scrollable">
					<div
						className="image"
						style={{
							backgroundImage: `url(/api/posts/${postData._id}/image)`,
						}}></div>
					<div className="metadata">
						<div className="title-and-likes-container">
							<p className="title">{postData.title}</p>
							<LikeButton post={postData} />
						</div>
						<div className="user-data">
							<div
								className="profile-pic"
								style={{
									backgroundImage: `url(/api/users/${postData.posterId}/avatar)`,
								}}></div>
							<Link to={`/users/${postData.posterId}`} className="username">
								{postData.posterUsername}
							</Link>
						</div>
						<div className="tags-listing">
							{postData.tags.map((t) => (
								<div className="tag">{t}</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
