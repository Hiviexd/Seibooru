import { useEffect, useState } from "react";
import "../styles/pages/LoadingPage.scss";

export function LoadingPage() {
	return (
		<div className="loading-page">
			<div className="container">
				<div className="loading-animation" />
			</div>
		</div>
	);
}
