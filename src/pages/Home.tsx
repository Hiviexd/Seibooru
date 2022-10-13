import React from "react";
import Navbar from "../components/global/Navbar";
import "../styles/pages/Home.scss";

export default function Home() {
	return (
		<>
			<Navbar />
			<div className="home">
				<div className="home__content">
					<div className="home__text">
						<span className="home__name">Seibooru</span>
						<span className="home__desc">
							A tag-based image hosting platform
						</span>
					</div>
					<div className="home__buttons">
						<a href="/login" className="home__button__link">
							Log in
						</a>
						<span className="home__button__text">don't have an account?</span>
						<a href="/signup" className="home__button__link">
							Sign up
						</a>
					</div>
					<div className="home__no-login">
						<a href="/listing" className="home__no-login__link">
							Or, click here to view Seibooru without logging in!
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
