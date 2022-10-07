import React, {useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import { PostSelector } from "../components/listing/PostSelector";
import "../styles/pages/Listing.scss";
import { generateComponentKey } from "../utils/generateComponentKey";
import { Pagination } from "@mui/material";

export default function Listing() {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(0)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		fetch(`/api/posts/listing?page=${page}`)
		.then((r) => r.json())
		.then((d) => {
			setPosts(d.data.posts)
			setTotalPages(d.data.totalPages)
		})
	}, [])

	return (
		<>
		  <Navbar />
		  <div className="listing" key={generateComponentKey(20)}>{posts.map((post) => <PostSelector post={post} />)}</div>
		  <Pagination count={totalPages} page={page} onChange={(ev, value) => {
			setPage(value)
		  }} />
		</>
	);
}
