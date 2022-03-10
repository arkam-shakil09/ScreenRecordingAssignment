import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import $ from 'jquery';
import './index.css';

function RecordingButton()
{
	let [state, updatedState] = useState("Start Recording");

	let captureEvents = (e) => 
	{
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
			let trgt = e.target;

			// Get tag name of Events Target
			let trgtTagName = e.target.tagName;

			// Get name of Events Target
			let trgtName = "";
			if(trgt.getAttribute("aria-label")) {
				trgtName = trgt.getAttribute("aria-label");
			}
			else {
				trgtName = trgt.innerText;
			}

			// Get id and class of element
			let trgtId = "";
			let trgtClass = "";
			if(trgt.id){
			// only id exists
				trgtId = "#" + trgt.id;
			}
			else if(trgt.className){
			// only class exists
				trgtClass = "." + trgt.className;
			}

		// Get extra information about event
		let xtra="";
		if(evt.keyCode){
			// If keyboard Event? get Key code
			xtra+=" KeyCode: "+evt.keyCode;
			xtra+=" Key: "+evt.key;
		}
			if(evt.shiftKey){
			// was Shift key pressed during occcurance of event?
			xtra+= " ShiftKey was pressed.";
		}
		if(evt.altKey){
			// was alt key pressed during occcurance of event?
			xtra+=" altKey was pressed.";
		}
		if(evt.metaKey){
			// MetaKey is used on Mac instead of ctrl Key on PC
			xtra+=" metaKey was pressed.";
		}
		if(evt.ctrlKey){
			// was ctrl key pressed on pc during occcurance of event?
			xtra+=" ctrlKey was pressed.";
		}
			//Get the current url
			let url = window.location.href;

			let msg = "\n EventType: " + et + ", EventTarget: " + trgt + ", Event Tag name: " + trgtTagName + ", Element Name: " + trgtName + ", Event Id: " + trgtId + ", Event Class: " + trgtClass + ", Extra:" + xtra + ", URL: " + url;
			let p = document.createElement('P');
			p.innerText = msg;
			document.body.appendChild(p);

		}
	}

	let togleRecordingState = () =>
	{
		if (state == "Start Recording")
		{
			updatedState("Stop Recording");
		}
		else {
			updatedState("Start Recording");
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
				mediaRecorder.stop();

				//Removing the capture events event from the body
				for(let i=0; i<events.length; i++)
				{
					document.body.removeEventListener("" + events[i] + "", captureEvents);
alert("" + events[i] + "");
				}
			}
		});
	}, []);

	return (
		<>
			<div id="controls-container">
				<button id="togle-recording-button" aria-label={state} onClick={togleRecordingState}>
					{state}
				</button>
			</div>
		</>
	);
}

export default RecordingButton;