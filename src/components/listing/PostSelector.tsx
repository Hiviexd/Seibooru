import "../../styles/components/listing/PostSelector.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LikeButton } from "../UI/LikeButton";
import { AuthContext } from "../../providers/AuthContext";

export const PostSelector = ({ post }: { post: any }) => {
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	function goTo(path: string) {
		navigate(path);
	}

	function goToPostPage() {
		goTo(`/posts?post=${post._id}`);
	}

	function handleUserAvatarClick() {
		goTo(`/users/${post.posterId}`);
	}

	return (
		<>
			<div className="post_selector">
				<div
					className="image"
					style={{
						backgroundImage: `url(/api/posts/${post._id}/image)`,
					}}
					onClick={goToPostPage}></div>
				<div className="metadata_row">
					<div className="user_info">
						<div className="user_image" onClick={handleUserAvatarClick}>
							<img src={`/api/users/${post.posterId}/avatar`} alt="user" />
						</div>
						<Link to={`/users/${post.posterId}`} className="username">
							{post.posterUsername}
						</Link>
					</div>
					<LikeButton post={post} />
				</div>
			</div>
		</>
	);
};
