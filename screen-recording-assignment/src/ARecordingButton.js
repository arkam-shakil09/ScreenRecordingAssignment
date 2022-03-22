import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import $ from 'jquery';
import { saveAs } from 'file-saver';
import './index.css';

function RecordingButton()
{
	let [labelState, updatedLabelState] = useState("Start Recording");

	const {
		status,
		startRecording: startRecord,
		stopRecording: stopRecord,
		mediaBlobUrl,
	} = useReactMediaRecorder({ screen: true, audio: false });

	let jsonEventObject: object = {"Event": ""};
	let jsonObjectArray = [];
	let eventCount = 1;
	let url = "";


	let getIndexForSelector = (element) => {
		let parent = element.parentNode;
		let child, index = 1;

		for (child = parent.firstElementChild; child; child = child.nextElementSibling)
		{
			if (child === element) {
				return index;
			}
			++index;
				}
		return -1;
	}


	let getSelector = (element)  =>
	{
		let selector = element.tagName + ":nth-child(" + getIndexForSelector(element) + ")";

		while ((element = element.parentElement) != null)
		{
			if (element.tagName === "BODY") {
				selector = "BODY > " + selector;
				break;
			}
			selector = element.tagName + ":nth-child(" + getIndexForSelector(element) + ") > " + selector;
		}
		return selector;
	}

	let captureEvents = (e) => 
	{
		let recordingButton = document.querySelector("#togle-recording-button");
		let jsonObject: object = {
			"id": "eventCount",
			"Event": "et",
			"KeyPressed": "KeyPressed",
			"ElementName": "Name",
			"Selector": "Selector",
			"Src": "src",
			"Url": "url",
			"CurrentUrl": "CurrentUrl"
		};

		let evt = e||window.event;

		if(evt) // If event exists
		{
			if(evt.isPropagationStopped && evt.isPropagationStopped())
			{
				// if event's propagation(bubbling) is stopped then DO NOTHING simply return.
				return;
			}

			//Checking whether e.target is same as recording button 
			//Skipping if the e.target is the recording button
			if (e.target != recordingButton)
			{
				// Get Event Type (Click or Keyup or focus etc)
				let et = evt.type?evt.type:evt;

				// Get Event Type (Click or Keyup or focus etc)
				let keyPressed = "";
				if (e instanceof KeyboardEvent)
				{
					if (e.shiftKey === true)
					{
						keyPressed += "Shift + ";
					}
					if (e.ctrlKey === true)
					{
						keyPressed += "CTRL + ";
					}
					if (e.altKey === true)
					{
						keyPressed += "ALT + ";
					}
					keyPressed += e.key;
				}

				// Get Events Target's tag name
				let tagName = e.target.tagName;

				// Get Events Selector
				let selector = getSelector(e.target);

				// Get Events source code
				let src = e.target.parentNode.innerHTML;

				//Get the current url
				let currentUrl = window.location.href;

				jsonObject.id= eventCount;
				jsonObject.Event = et;
				jsonObject.KeyPressed = keyPressed;
				jsonObject.ElementName = tagName;
				jsonObject.Selector = selector;
				jsonObject.Src = src;
				jsonObject.Url = url;
				jsonObject.CurrentUrl = currentUrl;
				eventCount++;
				jsonObjectArray.push(jsonObject);

				//If the url changes, then change the url of 'url' variable
				if (url != currentUrl)
				{
					url = currentUrl;
				}
			}
		}
	}

	let abc = () => 
	{
		url = window.location.href;
		let recordingButton = document.querySelector("#togle-recording-button");
		let events = ["click", "focus", "keydown", "keypressed"];

			if ($(recordingButton).text() == "Start Recording")
			{
				//Changing the state
				updatedLabelState("Stop Recording")
				startRecord();
				//Adding events on body for capturing the events
				for(let i=0; i<events.length; i++)
				{
					document.body.addEventListener("" + events[i] + "", captureEvents, false);
				}
			}
			else if ($(recordingButton).text() == "Stop Recording")
			{
				//Changing the state
				updatedLabelState("Start Recording")
				stopRecord();

					let downloadLink = document.createElement('a');
					downloadLink.innerText = "Download Recording";
					downloadLink.setAttribute("id", "download-button");
					downloadLink.setAttribute("role", "button");
alert(mediaBlobUrl);
					downloadLink.href = { mediaBlobUrl };
					downloadLink.download = "Recording.webm";
					document.getElementById("controls-container").appendChild(downloadLink);

				//Removing the capture events event from the body
				for(let i=0; i<events.length; i++)
				{
					document.body.removeEventListener("" + events[i] + "", captureEvents);
				}

				jsonEventObject.Event = jsonObjectArray;
				const blob = new Blob([JSON.stringify(jsonEventObject, null, 4)], {type : 'application/json'});
				saveAs(blob, 'event_details.json');
			}
	}

	return (
		<>
			<div id="controls-container">
				<button id="togle-recording-button" onClick={abc}>
					{labelState}
				</button>

				<a id="download-recording-button" href={mediaBlobUrl} role="link">
					Download Recording
				</a>

			</div>
		</>
	);
}

export default RecordingButton;