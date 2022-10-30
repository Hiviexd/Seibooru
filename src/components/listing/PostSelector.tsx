import "../../styles/components/listing/PostSelector.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import checkAdmin from "../../helpers/checkAdmin";
import checkBan from "../../helpers/checkBan";
import { LikeButton } from "../UI/LikeButton";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";

export const PostSelector = ({ post }: { post: any }) => {
	const navigate = useNavigate();
	const [isAdminPoster, setIsAdminPoster] = useState(false);
    const [isBanned, setIsBanned] = useState(false);

	function goTo(path: string) {
		navigate(path);
	}

	function goToPostPage() {
		goTo(`/posts?post=${post._id}`);
	}

	function handleUserAvatarClick() {
		goTo(`/users/${post.posterId}`);
	}

	useEffect(() => {
		fetch(`/api/users/${post.posterId}`)
			.then((r) => r.json())
			.then((d) => {
				setIsAdminPoster(checkAdmin(d.data));
                setIsBanned(checkBan(d.data));
			});
	}, []);

	return (
		<>
			{isBanned ? <></> : (
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
						{isAdminPoster && (
							<div className="admin-icon">
								<Tooltip title="Admin">
									<FontAwesomeIcon icon={faShieldHalved} />
								</Tooltip>
							</div>
						)}
					</div>
					<LikeButton post={post} />
				</div>
			</div>
            )}
		</>
	);
};
