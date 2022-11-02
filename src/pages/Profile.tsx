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
import {
	faShieldHalved,
	faTriangleExclamation,
	faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
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
import ErrorPage from "./ErrorPage";
import { useSnackbar } from "notistack";
import { SearchOverlay } from "../components/UI/SearchOverlay";
import { LoadingPage } from "./LoadingPage";
import { NotificationsSidebar } from "../components/UI/NotificationsSidebar";

export default function Profile() {
	const [openAdminPanel, setOpenAdminPanel] = useState(false);
	const [profile, setProfile] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);

	//? related to badges and banned user handling
	const [isAdmin, setIsAdmin] = useState(false);
	const [isBanned, setIsBanned] = useState(false);
	const [isOwner, setIsOwner] = useState(false);

	//? related to admin tools
	const [activeUserIsAdmin, setActiveUserIsAdmin] = useState(false);
	const [activeUserIsOwner, setActiveUserIsOwner] = useState(false);

	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { login } = useContext(AuthContext);
	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		setActiveUserIsOwner(login.permissions.includes("admin:admin"));
		setActiveUserIsAdmin(login.permissions.includes("admin:user" || "admin:admin"));

		fetch(`/api/users/${id}`)
			.then((r) => r.json())
			.then((d) => {
				setProfile(d.data);
				setIsOwner(d.data.permissions.includes("admin:admin"));
				setIsAdmin(d.data.permissions.includes("admin:user"));
				setIsBanned(!d.data.permissions.includes("post:create"));
				document.title = `${d.data.username} · Profile | Seibooru`;
			});

		fetch(`/api/users/${id}/posts?page=${page}`)
			.then((r) => r.json())
			.then((d) => {
				setPosts(d.data.posts);
				setTotalPages(d.data.totalPages);
			});

        fetch(`/api/users/${id}/followers`)
            .then((r) => r.json())
            .then((d) => {
                setFollowerCount(d.data.size);
            }
        );
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

	if (profile === null)
		return (
			<>
				<Navbar />
				<LoadingPage />
			</>
		);

	if (profile === undefined)
		return (
			<>
				<Navbar />
				<ErrorPage text="We looked hard, but we can't find this user sadly..." />
			</>
		);

	return (
		<>
			<Navbar />
			<SearchOverlay />
			<NotificationsSidebar />
			{!isBanned ||
			activeUserIsAdmin ||
			activeUserIsOwner ||
			login._id === id ? (
				<div className="profile-layout">
					<div className="profile">
						<div className="profile-header">
							<div className="profile-header-avatar">
								<div
									className="profile-pic"
									style={{
										backgroundImage: `url(/api/users/${id}/avatar)`,
									}}
								/>
							</div>
							<div className="profile-header-info">
								<div className="name-and-followers">
									<div className="profile-name">
										{profile.username}
										{isOwner ? (
											<div className="owner-icon">
												<Tooltip title="Owner">
													<FontAwesomeIcon icon={faAddressCard} />
												</Tooltip>
											</div>
										) : null}
										{isAdmin && !isOwner ? (
											<div className="admin-icon">
												<Tooltip title="Admin">
													<FontAwesomeIcon icon={faShieldHalved} />
												</Tooltip>
											</div>
										) : null}
										{isBanned && (
											<div className="banned-icon">
												<Tooltip title="Banned">
													<FontAwesomeIcon icon={faTriangleExclamation} />
												</Tooltip>
											</div>
										)}
									</div>
									<div className="profile-buttons">
										{login._id === profile._id ? (
											<SettingsButton />
										) : (
											<>
												<FollowUserButton userId={id} />
												{activeUserIsOwner || (activeUserIsAdmin && (!isAdmin || !isOwner)) ? (
													<IconButton
														aria-label="Admin Tools"
														onClick={handleOpenAdminPanel}>
														<MoreVertIcon />
													</IconButton>
												) : null}
											</>
										)}
									</div>
								</div>
							</div>
						</div>
                        <div className="profile-content">
                            <div className="profile-date">
                                <div className="profile-date-text">Joined</div>
                                <Tooltip
                                    title={moment(profile.createdAt).format(
                                        "MMMM Do YYYY, h:mm:ss A"
                                    )}>
                                    <div className="date">
                                        {moment(profile.createdAt).fromNow()}
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="profile-follower-count">
                                <div className="follower-count">
                                    {followerCount}
                                </div>
                                <div className="follower-count-text">
                                    {followerCount === 1 ? "Follower" : "Followers"}
                                </div>
                            </div>
                        </div>
						{profile.bio && (
							<div className="profile-bio-layout">
								<div className="profile-bio-title">
									<h3>Bio</h3>
								</div>
								<div className="profile-bio">
									<p>{profile.bio}</p>
								</div>
							</div>
						)}
					</div>
					<div className="profile-posts">
						{posts.length == 0 ? (
							<div className="no-posts">
								<h1>All empty here...</h1>
								{login._id === profile._id && <h4>Try posting something!</h4>}
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
				<ErrorPage text="We'd show you this user, but they were banned for violating the rules..." />
			)}
			{renderDialog}
			<PostButton />
		</>
	);
}
