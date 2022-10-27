import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { generateComponentKey } from "../../utils/generateComponentKey";
import "./../../styles/components/UI/FollowUserButton.scss";

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
				className="content"
				onClick={() => {
					handleFollowButton(followData);
				}}>
				{following ? "Unfollow" : "Follow"}
			</div>
		</div>
	);
}
