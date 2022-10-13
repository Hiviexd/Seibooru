import "../../styles/components/listing/PostSelector.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../providers/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { generateComponentKey } from "../../utils/generateComponentKey";
import { LikeButton } from "../UI/LikeButton";

export const PostSelector = ({ post }: { post: any }) => {
	const navigate = useNavigate();

	function goTo(path: string) {
		navigate(path);
	}

	function goToPostPage() {
		goTo(`/posts?post=${post._id}`);
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
					<LikeButton post={post} />
				</div>
			</div>
		</>
	);
};
