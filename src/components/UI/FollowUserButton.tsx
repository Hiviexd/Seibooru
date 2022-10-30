import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { generateComponentKey } from "../../utils/generateComponentKey";
import "./../../styles/components/UI/FollowUserButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

interface IFollowersResponse {
	size: number;
	statistics: {
		mutual: boolean;
		following: boolean;
	};
}

export function FollowUserButton({ userId }: { userId: string }) {
	const [followData, setFollowData] = useState<
		undefined | IFollowersResponse
	>();
	const { login } = useContext(AuthContext);
	const [following, setFollowing] = useState(false);
    //? https://bobbyhadz.com/blog/react-on-hover-show-text#show-text-when-hovering-over-an-element-in-react
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    }
    const handleMouseOut = () => {
        setIsHovering(false);
    }

    const dynamicFollowIcon = () => {
        if (isHovering) {
            return following ? faUserSlash : faUserPlus;
        } else {
            return following ? faUserGroup : faUser;
        }
    }

	useEffect(() => {
		fetch(
			`/api/users/${userId}/followers`,
			login.authenticated
				? {
						headers: {
							authorization: login.accountToken,
						},
				  }
				: null
		)
			.then((r) => r.json())
			.then((d) => {
				setFollowData(d.data);
				setFollowing(d.data.statistics.following || false);
			});
	}, []);

	if (!followData) return <></>;

	function handleFollowButton(followData: IFollowersResponse) {
		fetch(`/api/users/${userId}/followers`, {
			method: following ? "delete" : "post",
			headers: {
				authorization: login.accountToken,
			},
		})
			.then((r) => r.json())
			.then((d) => {
				followData.statistics.following = d.following;
				followData.size = d.size;

				setFollowData(JSON.parse(JSON.stringify(followData)));

				setFollowing(d.data.following);
			});
	}

	return (
		<div
			className={`follow-button-container ${following ? "following" : ""}`}
			key={generateComponentKey(10)}>
			<div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
				className={"content" + (following ? " following" : "")}
				onClick={() => {
					handleFollowButton(followData);
				}}>
                {isHovering ? (following ? <FontAwesomeIcon icon={faUserSlash} /> : <FontAwesomeIcon icon={faUserPlus} />) : (following ? <FontAwesomeIcon icon={faUserGroup} /> : <FontAwesomeIcon icon={faUser} />)} {" "}
				{following ? (isHovering ? "Unfollow" : "Following") : "Follow"}
			</div>
                {/* {following ? <PersonOffIcon /> : <PersonAddAlt1Icon />} */}
		</div>
	);
}
