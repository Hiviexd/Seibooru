import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { NotificationsContext } from "../../providers/NotificationsContext";
import "./../../styles/components/UI/NotificationsSidebar.scss";
import { generateComponentKey } from "../../utils/generateComponentKey";
import { useNavigate } from "react-router-dom";

export function NotificationsSidebar() {
	const context = useContext(NotificationsContext);
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	function goTo(path: string) {
		navigate(path);
	}

	useEffect(() => {
		fetchNotifications();

		setInterval(fetchNotifications, 15000);
	}, []);

	function fetchNotifications() {
		fetch(`/api/notifications`, {
			headers: {
				authorization: login.accountToken,
			},
		})
			.then((r) => r.json())
			.then((d) => {
				if (d.status != 200) return;

				context.setNotifications(d.data);
			});
	}

	function deleteNotification(data: any, ev: any) {
		fetch(`/api/notifications/${data._id}/delete`, {
			method: "POST",
			headers: {
				authorization: login.accountToken,
			},
		})
			.then((r) => r.json())
			.then((d) => {
				if (d.status != 200) return;

				context.setNotifications(
					context.notifications.filter((n) => n._id != data._id)
				);

				console.log(ev.target.className);

				if (data.extra.redirect && ev.target.className == "notification") {
					goTo(data.extra.redirect);
				}
			});
	}

	function clearNotifications() {
		fetch(`/api/notifications/clear`, {
			method: "POST",
			headers: {
				authorization: login.accountToken,
			},
		})
			.then((r) => r.json())
			.then((d) => {
				if (d.status != 200) return;

				context.setNotifications([]);
			});
	}

	function handleClose() {
		context.setOpen(false);
	}

	function handleAuxClose(ev: any) {
		if (ev.target.className == "notifications-sidebar") {
			context.setOpen(false);
		}
	}

	return (
		<div
			className={
				context.open ? "notifications-sidebar" : "notifications-sidebar closed"
			}
			onClick={handleAuxClose}>
			<div className="container">
				<div className="title">
					Notifications{" "}
					<FontAwesomeIcon
						onClick={handleClose}
						icon={icons.faArrowRightFromBracket}
					/>
				</div>
				<div className="notifications" key={generateComponentKey(20)}>
					<div className="clear-container" onClick={clearNotifications}>
						<FontAwesomeIcon icon={icons.faTrash} />
						Clear all notifications
					</div>
					{context.notifications == null
						? null
						: context.notifications.map((notification) => {
								return (
									<div
										className={"notification"}
										onClick={(ev) => {
											deleteNotification(notification, ev);
										}}>
										<div className="content-container">
											<div className="icon">
												<FontAwesomeIcon
													icon={icons[notification.extra.icon]}
												/>
											</div>
											<p className="content">{notification.content}</p>
										</div>
										<div
											className="dimiss-container"
											onClick={(ev) => {
												deleteNotification(notification._id, ev);
											}}>
											<FontAwesomeIcon icon={faCheck} />
										</div>
									</div>
								);
						  })}
				</div>
			</div>
		</div>
	);
}
