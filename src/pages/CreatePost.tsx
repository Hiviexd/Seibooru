import { Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/global/Navbar";
import { TrendingTags } from "../components/global/TrendingTags";
import { AuthContext } from "../providers/AuthContext";
import "./../styles/pages/CreatePost.scss";

export function CreatePost() {
	const [src, setSrc] = useState<any>();
	const [loading, setLoading] = useState(false);
	const formData = useRef(new FormData());
	const { login } = useContext(AuthContext);
	const { enqueueSnackbar } = useSnackbar();

	function handleFileInput(ev: any) {
		if (ev.target.files && ev.target.files[0]) {
			setSrc(URL.createObjectURL(ev.target.files[0]));

			formData.current.set("image", ev.target.files[0]);
		}
	}

	function sendPost() {
		setLoading(true);
		fetch(`/api/posts/new`, {
			method: "POST",
			headers: {
				authorization: login.accountToken,
			},
			body: formData.current,
		})
			.then((r) => r.json())
			.then((d) => {
				if (d.status != 200)
					return enqueueSnackbar(d.message, {
						variant: "error",
					});

				enqueueSnackbar("Post created!");
				setLoading(false);
			});
	}

	return (
		<>
			<Navbar />
			<div className="create-post-layout">
				<TrendingTags />
				<div className="scrollable">
					<div className="form">
						<div className="title">Create post</div>
						<div className="image-row">
							<div
								className="image"
								style={{
									backgroundImage: `url(${src})`,
								}}></div>
							<Button variant="contained" component="label">
								Select Image
								<input
									type="file"
									hidden
									onInput={(ev: any) => {
										handleFileInput(ev);
									}}
								/>
							</Button>
						</div>
						<TextField
							label="Title"
							onInput={(ev: any) => {
								formData.current.set("title", ev.target.value);
							}}
						/>
						<TextField
							label="Tags"
							onInput={(ev: any) => {
								formData.current.set(
									"tags",
									JSON.stringify(
										ev.target.value.toLowerCase().trim().split(" ")
									)
								);
							}}
						/>
						<Button variant="contained" onClick={sendPost}>
							post image
						</Button>
						{/* <LoadingButton
							variant="contained"
							onClick={sendPost}
							loading={loading}
							loadingPosition="start">
							Upload
						</LoadingButton> */}
					</div>
				</div>
			</div>
		</>
	);
}
