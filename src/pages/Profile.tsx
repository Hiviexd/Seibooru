import { useState, useEffect, useContext } from "react";
import moment from "moment";
import Navbar from "../components/global/Navbar";
import Tooltip from "@mui/material/Tooltip";
import { PostSelector } from "../components/listing/PostSelector";
import { Pagination } from "@mui/material";
import { PostButton } from "../components/UI/PostButton";
import { AuthContext } from "../providers/AuthContext";
import "./../styles/pages/Profile.scss";
import { useParams } from "react-router-dom";
import { FollowUserButton } from "../components/UI/FollowUserButton";
import { SettingsButton } from "../components/UI/SettingsButton";
import { generateComponentKey } from "../utils/generateComponentKey";

export default function Profile() {
	const [profile, setProfile] = useState(null);
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { login } = useContext(AuthContext);
	const { id } = useParams();

	useEffect(() => {
		console.log(login);
		fetch(`/api/users/${id}`)
			.then((r) => r.json())
			.then((d) => {
				setProfile(d.data);
			});

		fetch(`/api/users/${id}/posts?page=${page}`)
			.then((r) => r.json())
			.then((d) => {
				setPosts(d.data.posts);
				setTotalPages(d.data.totalPages);
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

	return (
		<>
			<Navbar />
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
								<h1 className="profile-name">{profile?.username}</h1>
								{login._id === profile?._id ? <SettingsButton /> : <FollowUserButton userId={id} />}
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
			<PostButton />
		</>
	);
}
