import { useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { useNavigate } from "react-router-dom";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import "./../../styles/components/UI/PostButton.scss";

//? displays in listing and profile pages

export const PostButton = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Fab
            color="primary"
            className="post-button"
            aria-label="add"
            onClick={() => {
                if (!login.authenticated) return navigate("/login");
                navigate("/new");
            }}>
            <AddIcon className="add-icon" />
        </Fab>
    );
}