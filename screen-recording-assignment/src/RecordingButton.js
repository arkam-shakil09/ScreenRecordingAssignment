import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import $ from 'jquery';
import { saveAs } from 'file-saver';
import './index.css';

function RecordingButton()
{
	let [state, updatedState] = useState("Start Recording");
	let jsonEventObject: object = {"Event": ""};
	let jsonObjectArray = [];
	let eventCount = 1;

	let captureEvents = (e) => 
	{
		let jsonObject: object = {
			"id": "eventCount",
			"Event": "et",
			"Element": "trgt",
			"Url": "url"
		};

		let evt = e||window.event;

		if(evt) // If event exists
		{
			if(evt.isPropagationStopped && evt.isPropagationStopped())
			{
				// if event's propagation(bubbling) is stopped then DO NOTHING simply return.
				return;
			}

			// Get Event Type (Click or Keyup or focus etc)
			let et = evt.type?evt.type:evt;

			// Get Events Target (Element from which event is bubbled)
			let trgt = e.target.tagName;

			//Get the current url
			let url = window.location.href;

			jsonObject.id= eventCount;
			jsonObject.Event = et;
			jsonObject.Element = trgt;
			jsonObject.Url = url;
			eventCount++;
			jsonObjectArray.push(jsonObject);
		}
	}

	useEffect(() =>
	{
		let recordingButton = document.getElementById("togle-recording-button");
		var mediaRecorder;
		$(recordingButton).click(async function ()
		{
			let events = ["click", "focus", "keydown", "keypressed"];

			if ($(recordingButton).attr("aria-label") == "Start Recording")
			{
				updatedState("Stop Recording");
				try {
					document.getElementById("download-button").remove();
				}
				catch {
					let x = 0;
				}

				let mimeType = "video/webm";
				let stream = await navigator.mediaDevices.getDisplayMedia({
					audio: true, 
					video: { mediaSource: "screen"}
				});

				let recordedChunks = []; 
				mediaRecorder = new MediaRecorder(stream);
				mediaRecorder.ondataavailable = function (e) {
					if (e.data.size > 0) {
						recordedChunks.push(e.data);
					}  
				};
				mediaRecorder.onstop = function () {

					const blob = new Blob(recordedChunks, {
						type: 'video/webm'
					});
					let downloadLink = document.createElement('a');
					downloadLink.innerText = "Download Recording";
					downloadLink.setAttribute("id", "download-button");
					downloadLink.setAttribute("role", "button");
					downloadLink.href = URL.createObjectURL(blob);
					downloadLink.download = "Recording.webm";
					document.getElementById("controls-container").appendChild(downloadLink);

					recordedChunks = [];
				};
				mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.

				//Adding events on body for capturing the events
				for(let i=0; i<events.length; i++)
				{
					document.body.addEventListener("" + events[i] + "", captureEvents, false);
				}
			}
			else if ($(recordingButton).attr("aria-label") == "Stop Recording")
			{
				updatedState("Start Recording");
				mediaRecorder.stop();

				//Removing the capture events event from the body
				for(let i=0; i<events.length; i++)
				{
					document.body.removeEventListener("" + events[i] + "", captureEvents);
				}

				jsonEventObject.Event = jsonObjectArray;
				const blob = new Blob([JSON.stringify(jsonEventObject, null, 4)], {type : 'application/json'});
				saveAs(blob, 'abc.json');
			}
		});
	}, []);

	return (
		<>
			<div id="controls-container">
				<button id="togle-recording-button" aria-label={state}>
					{state}
				</button>
			</div>
		</>
	);
}

export default RecordingButton;