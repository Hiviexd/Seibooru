import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import AuthProvider from "./providers/AuthContext";
import { SnackbarProvider } from "notistack";
import Post from "./pages/Post";
import { CreatePost } from "./pages/CreatePost";
import TrendingTagsProvider from "./providers/TrendingTagsContext";
import { generateComponentKey } from "./utils/generateComponentKey";
import SearchOverlayProvider from "./providers/SeachOverlayContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<AuthProvider>
		<TrendingTagsProvider>
			<SearchOverlayProvider>
				<SnackbarProvider maxSnack={3} preventDuplicate>
					<BrowserRouter>
						<ThemeProvider theme={theme}>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/listing" element={<Listing />} />
								<Route path="/login" element={<LogIn />} />
								<Route path="/signup" element={<LogIn />} />
								<Route path="/posts" element={<Post />} />
								<Route path="/new" element={<CreatePost />} />
								<Route path="/users/:id" element={<Profile />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="*" element={<Listing />} />
							</Routes>
						</ThemeProvider>
					</BrowserRouter>
				</SnackbarProvider>
			</SearchOverlayProvider>
		</TrendingTagsProvider>
	</AuthProvider>
);
