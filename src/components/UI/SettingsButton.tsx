import { useNavigate } from "react-router-dom";
import { generateComponentKey } from "../../utils/generateComponentKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "./../../styles/components/UI/SettingsButton.scss";

export function SettingsButton() {
    const navigate = useNavigate();

    return (
        <div
			className={`settings-button`}
			key={generateComponentKey(10)}>
			<div
				className="content"
				onClick={() => navigate("/settings")}>
				<FontAwesomeIcon icon={faGear} /> {"Settings"}
			</div>
		</div>
    );
}