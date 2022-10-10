import { VisibilityOff, Visibility, Error } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/pages/LogIn.scss";

export default function LogIn() {
	const [signup, setSignUp] = useState(
		window.location.pathname.includes("signup")
	);

	const [showPassword, setShowPassword] = useState(false);
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [data, setData] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});

	function switchFormType() {
		const defaultData = {
			username: "",
			password: "",
			confirmPassword: "",
		};

		setData(defaultData);
		setSignUp(!signup);
	}

	function handleClickShowPassword() {
		setShowPassword(!showPassword);
	}

	function LogInOptions() {
		return (
			<>
				<div className="title">Log-In</div>
				<TextField
					type="text"
					label="Username"
					variant="outlined"
					defaultValue={data.username}
					onInput={(ev: any) => {
						data.username = ev.target.value;
						setData(data);
					}}
				/>
				<TextField
					type={showPassword ? "text" : "password"}
					label="Confirm Password"
					variant="outlined"
					onInput={(ev: any) => {
						data.password = ev.target.value;
						setData(data);
					}}
					defaultValue={data.password}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end">
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button variant="contained">Log-in</Button>
				<p className="switch-type">
					Are you new here?{" "}
					<span className="switch-link" onClick={switchFormType}>
						Create an account!
					</span>
				</p>
			</>
		);
	}

	function SignUpOptions() {
		return (
			<>
				<div className="title">Sign-Up</div>
				<div
					className={
						passwordMatch
							? "password-match-alert"
							: "password-match-alert visible"
					}>
					<Error></Error>
					<p>Passwords must match</p>
				</div>
				<TextField
					type="text"
					label="Username"
					variant="outlined"
					defaultValue={data.username}
				/>
				<TextField
					type={showPassword ? "text" : "password"}
					label="Confirm Password"
					variant="outlined"
					onInput={(ev: any) => {
						data.password = ev.target.value;
						setData(data);
					}}
					defaultValue={data.password}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end">
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					type={showPassword ? "text" : "password"}
					label="Confirm Password"
					variant="outlined"
					defaultValue={data.confirmPassword}
					onInput={(ev: any) => {
						data.confirmPassword = ev.target.value;
						setData(data);
						setPasswordMatch(ev.target.value == data.password);
					}}
					error={!passwordMatch}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end">
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button variant="contained">Sign-Up</Button>
				<p className="switch-type" onClick={switchFormType}>
					Already have an account?{" "}
					<span className="switch-link" onClick={switchFormType}>
						Log-In here!
					</span>
				</p>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<div className="log__in__layout">
				<div className="form">
					{signup ? <SignUpOptions /> : <LogInOptions />}
				</div>
			</div>
		</>
	);
}