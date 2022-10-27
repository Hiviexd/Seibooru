import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import { AuthContext } from "../providers/AuthContext";
import "../styles/pages/Post.scss";
import { TrendingTags } from "../components/global/TrendingTags";
import { LikeButton } from "../components/UI/LikeButton";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

export default function Post() {
	const [postData, setPostData] = useState<any>();
	const postId = new URLSearchParams(location.search).get("post");
	const { login } = useContext(AuthContext);

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
						<div className="title-and-buttons-container">
							<p className="title">{postData.title}</p>
							<div className="buttons-container">
								{login._id === postData.posterId && (
									<>
										<Tooltip title="Edit">
											<IconButton
												className="button"
												aria-label="edit"
												size="small">
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete">
											<IconButton
												className="button"
												aria-label="delete"
												size="small"
												color="error">
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</>
								)}
								<LikeButton post={postData} />
							</div>
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
						<div className="tags-label">Tags</div>
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