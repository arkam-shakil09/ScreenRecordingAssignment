import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import $ from 'jquery';
import './index.css';

function RecordingButton()
{
	let [state, updatedState] = useState("Start Recording");
	let [tabindex, setTabindex] = useState(0);

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
			}
			else if ($(recordingButton).attr("aria-label") == "Stop Recording")
			{
				mediaRecorder.stop();
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