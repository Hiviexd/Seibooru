import "../styles/pages/Home.scss";
import logo from "../assets/logo-big.png";
import Navbar from "../components/global/Navbar";

export default function Home() {
	return (
		<>
			<div className="home">
            <Navbar />
				<div className="home-content">
					<div className="home-logo">
                        <img className="logo" src={logo} alt="logo" />
						<span className="home-desc">
							A tag-based image hosting platform
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
