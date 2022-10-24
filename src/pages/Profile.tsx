import { useState, useEffect, useContext } from "react";
import Navbar from "../components/global/Navbar";
import { PostSelector } from "../components/listing/PostSelector";
import { Pagination } from "@mui/material";
import { PostButton } from "../components/UI/PostButton";
import { AuthContext } from "../providers/AuthContext";
import "./../styles/pages/Profile.scss";
import { useParams } from "react-router-dom";

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

		fetch(`/api/users/${id}/liked?page=${page}`)
			.then((r) => r.json())
			.then((d) => {
				setPosts(d.data.posts);
				setTotalPages(d.data.totalPages);
			});
	}, []);

	function refreshListing(page: number) {
		fetch(`/api/users/${id}/liked?page=${page}`)
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
							<h1 className="profile-name">{profile?.username}</h1>
							<p className="profile-bio">{profile?.bio}</p>
						</div>
					</div>
				</div>
				<div className="profile-posts">
					{posts.map((post) => (
						<PostSelector post={post} />
					))}
				</div>
				<Pagination
					count={totalPages}
					page={page}
					onChange={(ev, page) => {
						setPage(page);
						refreshListing(page);
					}}
				/>
			</div>
			<PostButton />
		</>
	);
}
