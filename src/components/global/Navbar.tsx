import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthContext";
import { useContext } from "react";
import { Avatar, IconButton, Badge, Menu, MenuItem } from "@mui/material";
import {
	AccountCircle,
	Settings as SettingsIcon,
	Logout as LogoutIcon,
	Search as SearchIcon,
} from "@mui/icons-material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import "./../../styles/components/global/Navbar.scss";
import { LogoImage } from "../../styles/components/images/Logo";
import { generateComponentKey } from "../../utils/generateComponentKey";

export default function Navbar() {
	const { login, logout } = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const navigate = useNavigate();

	function goTo(path: string) {
		navigate(path);
	}

	const handleProfileClick = () => {
		goTo(`/users/${login._id}`);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem
				onClick={() => {
					handleProfileClick();
					handleMenuClose();
				}}>
				<AccountCircle className="icon-menu" /> Profile
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>
				<SettingsIcon className="icon-menu" /> Account settings
			</MenuItem>
			<MenuItem
				onClick={() => {
					handleLogout();
					handleMenuClose();
				}}>
				<LogoutIcon className="icon-menu" color="inherit" /> Logout
			</MenuItem>
		</Menu>
	);

	return (
		<div className="navbar" key={generateComponentKey(20)}>
			<div className="navbar-left">
				<Link to="/" className="logo-container">
					<LogoImage className="logo" />
				</Link>
				<Link to="/" className="button">
					Home
				</Link>
				<Link to="/listing" className="button">
					Listing
				</Link>
				<Link to="/about" className="button">
					About
				</Link>
				<IconButton size="large" aria-label="search" color="inherit">
					<SearchIcon />
				</IconButton>
			</div>
			{!login.authenticated && (
				<div className="navbar-right">
					<Link to="/signup" className="button signup">
						SIGN UP
					</Link>
					<Link to="/login" className="button login">
						LOGIN
					</Link>
				</div>
			)}
			{login.authenticated && (
				<div className="navbar-right">
					<IconButton
						size="large"
						aria-label="show 17 new notifications"
						color="inherit">
						<Badge badgeContent={17} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton
						size="large"
						edge="end"
						aria-label="account of current user"
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color="inherit">
						<Avatar src={`/api/users/${login._id}/avatar`} />
					</IconButton>
					{renderMenu}
				</div>
			)}
		</div>
	);
}
