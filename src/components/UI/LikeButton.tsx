import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./../../styles/components/UI/LikeButton.scss";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { generateComponentKey } from "../../utils/generateComponentKey";
import { AuthContext } from "../../providers/AuthContext";

export const LikeButton = ({ post }, { post: any }) => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const snackbar = useSnackbar();

	const [likes, setLikes] = useState(post.likes.length);
	const [liked, setLiked] = useState(post.likes.includes(login._id));

	function goTo(path: string) {
		navigate(path);
	}

	function likePost(remove: boolean) {
		if (!login.authenticated) return goTo("/login");

		fetch(`/api/posts/${post._id}/like`, {
			method: remove ? "DELETE" : "POST",
			headers: {
				authorization: login.accountToken,
			},
		})
			.then((r) => r.json())
			.then((d) => {
				if (d.status != 200) return snackbar.enqueueSnackbar(d.message);

				setLikes(liked ? likes - 1 : likes + 1);
				setLiked(!remove);
			});
	}

	return (
		<div
			className={liked ? "like-button like liked" : "like-button like"}
			onClick={() => {
				liked ? likePost(true) : likePost(false);
			}}>
			<div className="icon">
				<FontAwesomeIcon icon={faHeart} />
			</div>
			<p className="text" key={generateComponentKey(10)}>
				{likes}
			</p>
		</div>
	);
};
