import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import LogIn from "./pages/LogIn";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/posts" element={<Listing />} />
				<Route path="/login" element={<LogIn />} />
				<Route path="/signup" element={<LogIn />} />
			</Routes>
		</ThemeProvider>
	</BrowserRouter>
);
