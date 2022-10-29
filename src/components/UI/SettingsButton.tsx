import { useNavigate } from "react-router-dom";
import { generateComponentKey } from "../../utils/generateComponentKey";
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
				{"Settings"}
			</div>
		</div>
    );
}