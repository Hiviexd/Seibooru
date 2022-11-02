import React, { createContext, useState } from "react";

interface INotificationsContext {
	open: boolean;
	notifications: null | any[];
	setOpen: (open) => any;
	setNotifications: (any) => any;
}

export const NotificationsContext = createContext<INotificationsContext>({
	open: false,
	notifications: null,
	setOpen: (open: boolean) => void {},
	setNotifications: (notifications: any[]) => void {},
});

const NotificationsProvider = ({ children }: any) => {
	const [open, setOpen] = useState(false);
	const [notifications, setNotifications] = useState([]);

	return (
		<NotificationsContext.Provider
			value={{
				open,
				setOpen,
				notifications,
				setNotifications,
			}}>
			{children}
		</NotificationsContext.Provider>
	);
};

export default NotificationsProvider;
