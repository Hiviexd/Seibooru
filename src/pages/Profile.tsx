import { useState, useEffect, useContext } from "react";
import moment from "moment";
import Navbar from "../components/global/Navbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PostSelector } from "../components/listing/PostSelector";
import { Pagination } from "@mui/material";
import { PostButton } from "../components/UI/PostButton";
import { AuthContext } from "../providers/AuthContext";
import "./../styles/pages/Profile.scss";
import { useParams } from "react-router-dom";
import { FollowUserButton } from "../components/UI/FollowUserButton";
import { SettingsButton } from "../components/UI/SettingsButton";
import { generateComponentKey } from "../utils/generateComponentKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faTriangleExclamation, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import checkAdmin from "../helpers/checkAdmin";
import checkBan from "../helpers/checkBan";
import checkOwner from "../helpers/checkOwner";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import GavelIcon from "@mui/icons-material/Gavel";
import BalanceIcon from "@mui/icons-material/Balance";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import { useSnackbar } from "notistack";

export default function Profile() {
	const [openAdminPanel, setOpenAdminPanel] = useState(false);
	const [profile, setProfile] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isBanned, setIsBanned] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
	const [activeUserIsAdmin, setActiveUserIsAdmin] = useState(false);
	const [activeUserIsOwner, setActiveUserIsOwner] = useState(false);
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { login } = useContext(AuthContext);
	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		console.log(login);
		fetch(`/api/users/${id}`)
			.then((r) => r.json())
			.then((d) => {
				setProfile(d.data);
				setIsAdmin(checkAdmin(d.data));
				setIsBanned(checkBan(d.data));
                setIsOwner(checkOwner(d.data));
			});

		fetch(`/api/users/${id}/posts?page=${page}`)
			.then((r) => r.json())
			.then((d) => {
				setPosts(d.data.posts);
				setTotalPages(d.data.totalPages);
			});

		fetch(`/api/users/${login._id}`)
			.then((r) => r.json())
			.then((d) => {
				setActiveUserIsAdmin(checkAdmin(d.data));
				setActiveUserIsOwner(checkOwner(d.data));
			});
	}, [id]);

	function refreshListing(page: number) {
		fetch(`/api/users/${id}/posts?page=${page}`)
			.then((r) => r.json())
			.then((d) => {
				setPosts(d.data.posts);
				setTotalPages(d.data.totalPages);
			});
	}

	const handleOpenAdminPanel = () => {
		setOpenAdminPanel(true);
	};

	const handleCloseAdminPanel = () => {
		setOpenAdminPanel(false);
	};

	const handleBanUser = () => {
		handleCloseAdminPanel();
		fetch(`/api/users/${id}/ban`, {
			method: "POST",
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
				enqueueSnackbar("User Banned!", {
					variant: "success",
				});
				window.location.reload();
			});
	};

	const handleUnbanUser = () => {
		handleCloseAdminPanel();
		fetch(`/api/users/${id}/unban`, {
			method: "POST",
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
				enqueueSnackbar("User Unbanned!", {
					variant: "success",
				});
				window.location.reload();
			});
	};

	const handlePromoteAdmin = () => {
		handleCloseAdminPanel();
		fetch(`/api/users/${id}/promote`, {
			method: "POST",
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
				enqueueSnackbar("User Promoted to Admin!", {
					variant: "success",
				});
				window.location.reload();
			});
	};

	const handleDemoteAdmin = () => {
		handleCloseAdminPanel();
		fetch(`/api/users/${id}/demote`, {
			method: "POST",
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
				enqueueSnackbar("User Demoted from Admin!", {
					variant: "success",
				});
				window.location.reload();
			});
	};

	const renderDialog = (
		<Dialog
			open={openAdminPanel}
			onClose={handleCloseAdminPanel}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{"Admin Panel"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Select an action:
				</DialogContentText>
				<List>
					{!isBanned && !isAdmin && (
						<ListItem>
							<ListItemButton onClick={handleBanUser}>
								<ListItemIcon>
									<GavelIcon />
								</ListItemIcon>
								<ListItemText primary="Ban User" />
							</ListItemButton>
						</ListItem>
					)}
					{isBanned && (
						<ListItem>
							<ListItemButton onClick={handleUnbanUser}>
								<ListItemIcon>
									<BalanceIcon />
								</ListItemIcon>
								<ListItemText primary="Unban User" />
							</ListItemButton>
						</ListItem>
					)}
					{activeUserIsOwner && !isAdmin && !isBanned && (
						<ListItem>
							<ListItemButton onClick={handlePromoteAdmin}>
								<ListItemIcon>
									<AddModeratorIcon />
								</ListItemIcon>
								<ListItemText primary="Promote to Admin" />
							</ListItemButton>
						</ListItem>
					)}
					{activeUserIsOwner && isAdmin && !isBanned && (
						<ListItem>
							<ListItemButton onClick={handleDemoteAdmin}>
								<ListItemIcon>
									<RemoveModeratorIcon />
								</ListItemIcon>
								<ListItemText primary="Remove from Admin" />
							</ListItemButton>
						</ListItem>
					)}
				</List>
			</DialogContent>
		</Dialog>
	);
	return (
		<>
            <Navbar />
			{!isBanned || activeUserIsAdmin || login._id === id ? (
				<div className="profile-layout">
					<div className="profile" key={generateComponentKey(10)}>
						<div className="profile-header">
							<div className="profile-header-avatar">
								<div
									className="profile-pic"
									style={{
										backgroundImage: `url(/api/users/${id}/avatar?nonce=${generateComponentKey(
											10
										)})`,
									}}
								/>
							</div>
							<div className="profile-header-info">
								<div className="name-and-followers">
									<div className="profile-name">
										{profile?.username}
                                        {isOwner && (<div className="owner-icon">
												<Tooltip title="Owner">
													<FontAwesomeIcon icon={faAddressCard} />
												</Tooltip>
											</div>
										)}
										{isAdmin && !isOwner && (
											<div className="admin-icon">
												<Tooltip title="Admin">
													<FontAwesomeIcon icon={faShieldHalved} />
												</Tooltip>
											</div>
										)}
										{isBanned && (
											<div className="banned-icon">
												<Tooltip title="Banned">
													<FontAwesomeIcon icon={faTriangleExclamation} />
												</Tooltip>
											</div>
										)}
									</div>
									<div className="profile-buttons">
										{login._id === profile?._id ? (
											<SettingsButton />
										) : (
											<>
												<FollowUserButton userId={id} />
												{activeUserIsAdmin && (!isAdmin || activeUserIsOwner) && (
													<IconButton
														aria-label="Admin Tools"
														onClick={handleOpenAdminPanel}>
														<MoreVertIcon />
													</IconButton>
												)}
											</>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="profile-date">
							<div className="profile-date-text">Joined</div>
							<Tooltip
								title={moment(profile?.createdAt).format(
									"MMMM Do YYYY, h:mm:ss A"
								)}>
								<div className="date">
									{moment(profile?.createdAt).fromNow()}
								</div>
							</Tooltip>
						</div>
						{profile?.bio && (
							<div className="profile-bio-layout">
								<div className="profile-bio-title">
									<h3>Bio</h3>
								</div>
								<div className="profile-bio">
									<p>{profile?.bio}</p>
								</div>
							</div>
						)}
					</div>
					<div className="profile-posts">
						{posts.length == 0 ? (
							<div className="no-posts">
								<h1>All empty here...</h1>
								{login._id === profile?._id && <h4>Try posting something!</h4>}
							</div>
						) : (
							posts.map((post) => <PostSelector post={post} />)
						)}
					</div>
					{posts.length != 0 ? (
						<Pagination
							count={totalPages}
							page={page}
							onChange={(ev, page) => {
								setPage(page);
								refreshListing(page);
							}}
						/>
					) : null}
				</div>
			) : (
				<h1>banned</h1>
			)}
			{renderDialog}
			<PostButton />
		</>
	);
}
