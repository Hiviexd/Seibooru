import { useEffect } from "react";
import "../styles/pages/UserNotFound.scss";
import Navbar from "../components/global/Navbar";
import { SearchOverlay } from "../components/UI/SearchOverlay";

export default function ErrorPage({ text }: { text?: string }) {
	useEffect(() => {
		document.title = "Error | Seibooru";
	}, []);

	return (
		<>
			<div className="not-found-page">
				<div className="content">
					<div className="text">
						<div className="title">Oops...</div>
						<div className="description">
							{text ? text : "There was an error loading this page..."}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
