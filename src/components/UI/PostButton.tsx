import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { useNavigate } from "react-router-dom";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import "./../../styles/components/UI/PostButton.scss";
import checkBan from "../../helpers/checkBan";
import { useSnackbar } from "notistack";

//? displays in listing and profile pages

export const PostButton = () => {
    const [isBanned, setIsBanned] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetch(`/api/users/${login._id}`)
            .then((r) => r.json())
            .then((d) => {
                setIsBanned(checkBan(d.data));
            });
    }, [login]);

    return (
        <Fab
            color="primary"
            className="post-button"
            aria-label="add"
            onClick={() => {
                if (!login.authenticated) return navigate("/login");
                if (isBanned) return enqueueSnackbar("You are banned from posting", { variant: "error" });
                navigate("/new");
            }}>
            <AddIcon className="add-icon" />
        </Fab>
    );
}