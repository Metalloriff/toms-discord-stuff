import React from "react";
import { useMediaQuery } from "react-responsive";
import "./App.scss";
import { Modals } from "./Components/Modals";
import HomePage from "./Pages/Home";
import Toasts from "./Components/Toasts";
import { joinClassNames } from "./Classes/Constants";
import ContextMenu from "./Components/ContextMenuHandler";

export default function App() {
	const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	App.isMobile = isMobile;
	
	let PageElement;
	
	switch (window.location.hash.split(/#\/?/)[1]) {
		default:
			PageElement = HomePage;
			break;
			
		case "sub_page":
			break;
	}

	return (
		<div className={joinClassNames("App", isMobile ? "Mobile" : "Desktop")}>
			<div className="Main">
				<PageElement/>
			</div>

			<footer className="Footer">
				<div><a href="https://fontawesome.com/license">Icon License</a></div>
				<div className="Divider"/>
				<div><a href="https://www.nordtheme.com/">Color Palette</a></div>
				<div className="Divider"/>
				<div>Copyright © 2021-{new Date().getFullYear()} Metalloriff</div>
				<div className="Divider"/>
				<div>Site by <a href="https://metalloriff.github.io/">Metalloriff</a></div>
			</footer>

			<Modals/>
			<Toasts/>
			<ContextMenu.Handler/>
		</div>
	);
}