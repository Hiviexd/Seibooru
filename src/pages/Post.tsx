import React, { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../components/global/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { useSnackbar } from "notistack";
import { useNavigate, redirect } from "react-router-dom";
import "../styles/pages/Post.scss";
import { TrendingTags } from "../components/global/TrendingTags";
import { LikeButton } from "../components/UI/LikeButton";
import { PostButton } from "../components/UI/PostButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import "@emotion/react";
import "@emotion/styled";
import { generateComponentKey } from "../utils/generateComponentKey";
import checkAdmin from "../helpers/checkAdmin";
import checkOwner from "../helpers/checkOwner";

export default function Post() {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAdminPoster, setIsAdminPoster] = useState(false);
    const [isOwnerPoster, setIsOwnerPoster] = useState(false);
	const [openDelete, setOpenDelete] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [postData, setPostData] = useState<any>();
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState([]);
	const postId = new URLSearchParams(location.search).get("post");
	const { login } = useContext(AuthContext);

	function sanitizeTitle(title: string) {
		if (!title) return title;

		if (title.trim() == "") return title;

		return title.trim();
	}

	function sanitizeTags(tags: any[]) {
		try {
			if (!tags) return [];

			const sanitized: string[] = [];

			for (let tag of tags) {
				tag = tag.toString().trim().toLowerCase().replace(/ /g, "_");

				if (typeof tag == "string" && tag != "" && tag.length < 150) {
					sanitized.push(tag);
				}
			}

			return sanitized;
		} catch (e) {
			console.error(e);

			return [];
		}
	}

	const handleOpenDelete = () => {
		setOpenDelete(true);
	};
	const handleCloseDelete = () => {
		setOpenDelete(false);
	};
	const handleOpenEdit = () => {
		setOpenEdit(true);
	};
	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const handleDelete = () => {
		handleCloseDelete();
		fetch(`/api/posts/${postId}/delete`, {
			method: "DELETE",
			headers: {
				authorization: login.accountToken,
			},
		})
			.then((r) => r.json())
			.then((d) => {
				if (d.status != 200)
					return enqueueSnackbar(d.message, {
						variant: "error",
					});
				enqueueSnackbar("Post deleted!", {
					variant: "success",
				});
				navigate(-1);
			});
	};

	const handleEdit = () => {
		handleCloseEdit();
		fetch(`/api/posts/${postId}/edit`, {
			method: "POST",
			headers: {
				authorization: login.accountToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: sanitizeTitle(title),
				tags: sanitizeTags(tags),
			}),
		})
			.then((r) => r.json())
			.then((d) => {
				if (d.status != 200)
					return enqueueSnackbar(d.message, {
						variant: "error",
					});
				enqueueSnackbar("Post updated!", {
					variant: "success",
				});
				window.location.reload();
			});
	};

	useEffect(() => {
		fetch(`/api/posts/${postId}`)
			.then((r) => r.json())
			.then((d) => {
				setPostData(d.data);
                setTags(d.data.tags);
				fetch(`/api/users/${d.data.posterId}`)
					.then((r) => r.json())
					.then((d) => {
						setIsAdminPoster(checkAdmin(d.data));
                        setIsOwnerPoster(checkOwner(d.data));
					});
			});

		fetch(`/api/users/${login._id}`)
			.then((r) => r.json())
			.then((d) => {
				setIsAdmin(checkAdmin(d.data));
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
								{(login._id === postData.posterId || isAdmin) && (
									<>
										<Tooltip title="Edit">
											<IconButton
												className="button"
												aria-label="edit"
												onClick={handleOpenEdit}
												size="small">
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete">
											<IconButton
												className="button"
												aria-label="delete"
												onClick={handleOpenDelete}
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
						<div className="post-date">
							<div className="post-date-text">Created</div>
							<Tooltip
								title={moment(postData.createdAt).format(
									"MMMM Do YYYY, h:mm:ss A"
								)}>
								<div className="date">
									{moment(postData.createdAt).fromNow()}
								</div>
							</Tooltip>
						</div>
						<div className="user-data">
							<div
								className="profile-pic"
								style={{
									backgroundImage: `url(/api/users/${
										postData.posterId
									}/avatar?nonce=${generateComponentKey(10)})`,
								}}></div>
							<Link to={`/users/${postData.posterId}`} className="username">
								{postData.posterUsername}
							</Link>
                            {isOwnerPoster && (
								<div className="owner-icon">
									<Tooltip title="Owner">
										<FontAwesomeIcon icon={faAddressCard} />
									</Tooltip>
								</div>
							)}
							{isAdminPoster && !isOwnerPoster && (
								<div className="admin-icon">
									<Tooltip title="Admin">
										<FontAwesomeIcon icon={faShieldHalved} />
									</Tooltip>
								</div>
							)}
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
			<PostButton />
			<Dialog
				open={openDelete}
				onClose={handleCloseDelete}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"Delete post?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this post? This action cannot be
						reverted.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDelete} color="primary">
						Cancel
					</Button>
					<Button
						onClick={handleDelete}
						variant="contained"
						color="error"
						startIcon={<DeleteIcon />}
						autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={openEdit}
				onClose={handleCloseEdit}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"Edit post"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Edit your post here.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="title"
						label="Title"
						type="text"
						fullWidth
						defaultValue={postData.title}
						onBlur={(e) => setTitle(e.target.value)}
					/>
					<TextField
						margin="dense"
						id="tags"
						label="Tags"
						type="text"
						fullWidth
						defaultValue={sanitizeTags(postData.tags).join(" ")}
						onBlur={(e) =>
							setTags(e.target.value.toLowerCase().trim().split(" "))
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseEdit} color="primary">
						Cancel
					</Button>
					<Button
						onClick={handleEdit}
						variant="contained"
						color="primary"
						startIcon={<EditIcon />}
						autoFocus>
						Edit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
