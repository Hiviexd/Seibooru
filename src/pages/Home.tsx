import { useEffect } from "react";
import "../styles/pages/Home.scss";
import logo from "../assets/logo-big.png";
import Navbar from "../components/global/Navbar";
import { SearchOverlay } from "../components/UI/SearchOverlay";
import { NotificationsSidebar } from "../components/UI/NotificationsSidebar";

export default function Home() {
	useEffect(() => {
		document.title = "Seibooru";
	}, []);

	return (
		<div className="home">
			<Navbar />
			<SearchOverlay />
			<NotificationsSidebar />
			<div className="home-content">
				<div className="home-logo">
					<img className="logo" src={logo} alt="logo" />
					<span className="home-desc">A tag-based image hosting platform</span>
				</div>
			</div>
		</div>
	);
}
