import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import { AuthContext } from "../providers/AuthContext";
import { Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import "./../styles/pages/Settings.scss";
import { generateComponentKey } from "../utils/generateComponentKey";

export default function Settings() {
	const [src, setSrc] = useState<any>();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const formData = useRef(new FormData());
	const { login } = useContext(AuthContext);
	const { enqueueSnackbar } = useSnackbar();
	const [userData, setUserData] = useState<any>();

	useEffect(() => {
		setSrc(`/api/users/${login._id}/avatar?nonce=${generateComponentKey(10)}`);

		fetch(`/api/users/${login._id}`)
			.then((r) => r.json())
			.then((d) => {
				setUserData(d.data);
			});
	}, []);

	function handleFileInput(ev: any) {
		if (ev.target.files && ev.target.files[0]) {
			setSrc(URL.createObjectURL(ev.target.files[0]));

			formData.current.set("image", ev.target.files[0]);
		}
	}

	function updateUser() {
		setLoading(true);
		fetch(`/api/users/update`, {
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

				enqueueSnackbar("User updated!", {
					variant: "success",
				});
				navigate("/users/" + login._id);
				setLoading(false);
			});
	}

	if (!userData) return <></>;

	return (
		<>
			<Navbar />
			<div className="settings-layout">
				<div className="scrollable">
					<div className="form">
						<div className="title">Settings</div>
						<div className="image-row">
							<div
								className="image"
								style={{
									backgroundImage: `url(${src})`,
								}}></div>
							<Button variant="contained" component="label">
								Update avatar
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
							label="Bio"
							onInput={(ev: any) => {
								formData.current.set("bio", ev.target.value);
							}}
							defaultValue={userData.bio}
							multiline
						/>
						<Button variant="contained" onClick={updateUser}>
							Update
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
