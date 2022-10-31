import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "../styles/pages/About.scss";
import logo from "../assets/logo-big.png";
import Navbar from "../components/global/Navbar";

export default function About() {
	return (
		<>
			<Navbar />
			<div className="about-page">
				<div className="content">
					<div className="logo-container">
						<img className="logo" src={logo} alt="logo" />
						<div className="logo-credit">
							Logo by{" "}
							<a
								className="logo-credit__link"
								href="https://twitter.com/ZethZ161"
                                target="_blank">
								<FontAwesomeIcon icon={faTwitter} /> ZethZ161
							</a>
						</div>
					</div>
					<div className="text">
						<div className="description">
							Graduation project for the GOMYCODE Full-Stack web development
							course.
						</div>
						<div className="note">
							made with <FontAwesomeIcon icon={faHeart} className="heart" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
