import React from "react";
import videoBg from "../assets/videoBg.webm";
import "../styles/Home.css";

export default function Home() {
	return (
		<div className="home">
			<video className="videoBg" autoPlay loop muted>
				<source src={videoBg} type="video/webm" />
			</video>
			<div className="home__content">
				<div className="home__text">
					<span className="home__name">Seibooru</span>
					<span className="home__desc">A tag-based image hosting platform</span>
				</div>
            <div className="home__buttons">
                <a href="/login" className="home__button__link">Log in</a>
                <span className="home__button__text">don't have an account?</span>
                <a href="/signup" className="home__button__link">Sign up</a>
            </div>
            <div className="home__no-login">
                <a href="/posts" className="home__no-login__link">Or, click here to view Seibooru without logging in!</a>
            </div>
			</div>
		</div>
	);
}
