import React from "react";
import "./Home.scss";
import { joinClassNames } from "../Classes/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faCode,
	faCommentSlash,
	faDownload,
	faExclamationCircle,
	faImages,
	faPlug
} from "@fortawesome/free-solid-svg-icons";
import InlineLoading from "../Components/InlineLoading";
import Tooltip from "../Components/Tooltip";
import { openImageModal } from "../Components/Modals";
import LinkWrapper from "../Components/LinkWrapper";
import App from "../App";

export function AddonItem({ name, description, version, previews, deprecated, source, download, type = "Plugin" }) {
	const viewImages = () => openImageModal(previews[0], () => previews);
	
	return (
		<div className={joinClassNames("AddonItem", type, [!!previews?.length, "HasPreviews"], [deprecated, "Deprecated"])}>
			<div className="Header">
				<div className="Name">{name}</div>
				
				<div className="Version">v{version}</div>
			</div>
			
			{ previews?.length && (
				<div className="Previews">
					<img alt="Preview" src={previews[0]} onClick={viewImages}/>
				</div>
			) }
			
			<div className="Footer">
				<div className="Description">
					{description}
				</div>
				
				<div className="ButtonsContainer">
					{ previews?.length && (
						<div className="Button" onClick={viewImages}>
							<FontAwesomeIcon icon={faImages} className="Icon"/>
							<span>Images</span>
						</div>
					) }
					
					{ !App.isMobile && (
						<LinkWrapper href={download ?? `https://raw.githubusercontent.com/Metalloriff/BetterDiscordPlugins/master/${name}.plugin.js`}>
							<div className="Button">
								<FontAwesomeIcon icon={faDownload} className="Icon"/>
								<span>Download</span>
							</div>
						</LinkWrapper>
					) }
					
					<LinkWrapper href={source ?? `https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/${name}.plugin.js`}>
						<div className="Button">
							<FontAwesomeIcon icon={faCode} className="Icon"/>
							<span>Source Code</span>
						</div>
					</LinkWrapper>
				</div>
			</div>
		</div>
	);
}

let itemsCache = null;
export default function HomePage() {
	// Create the items state from the cached items if it exists
	const [items, initItems] = React.useState(itemsCache);
	
	React.useEffect(() => {
		// On mount, fetch the data, render it as JSON, then set our items state
		fetch("https://dl.dropboxusercontent.com/s/hltcob7d3qvtga6/plugins.json?raw=1", { cache: "no-cache" })
			.then(response => response.json())
			.then(initItems);
	}, []);
	
	return (
		<div className="MainPage">
			{ items ? (
				<React.Fragment>
					<div className="ItemsContainer">
						<div className="Title">
							<FontAwesomeIcon icon={faExclamationCircle}/>
							<span>Important Notice</span>
						</div>
						
						<div className="Description">
							My BD plugins are a low priority for me as
							I have a lot of other <a href="https://metalloriff.github.io/#projects">projects</a> that I'm working on.
							<br/><br/>
							Due to this, if a plugin breaks, it may be a while before it's patched.
							<br/><br/>
							You may offer payments speed this process up, as I'm medically unable to work,
							and money will make things more urgent, but I do not expect this from anyone.
							<br/><br/>
							I apologize in advance for the delays.
						</div>
					</div>
					
					<div className="ItemsContainer">
						<div className="Title">
							<FontAwesomeIcon icon={faPlug}/>
							<span>Plugins</span>
						</div>

						<div className="Description">
							These are my maintained plugins.
							<br/>
							If you have issues, please report them in my <a href="https://discord.gg/yNqzuJa">Discord server</a>.
						</div>

						<div className="Items">
							{ items.filter(item => !item.deprecated).map(item => <AddonItem {...item}/>) }
						</div>
					</div>
					
					<div className="ItemsContainer">
						<div className="Title">
							<FontAwesomeIcon icon={faCommentSlash}/>
							<span>Deprecated Plugins</span>
						</div>
						
						<div className="Description">
							These plugins are outdated, and may or may not be updated in the future.
							<br/>
							Please do not report any bugs related to these plugins to me.
						</div>

						<div className="Items">
							{ items.filter(item => item.deprecated).map(item => <AddonItem {...item}/>) }
						</div>
					</div>
				</React.Fragment>
			) : <InlineLoading/> }
		</div>
	);
}