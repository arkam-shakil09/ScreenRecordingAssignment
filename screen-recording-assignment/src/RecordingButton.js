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
		let mediaRecorder;
		$(recordingButton).click(async function ()
		{
			if ($(recordingButton).attr("aria-label") == "Start Recording")
			{
				let mimeType = "video/webm";
				let stream = await navigator.mediaDevices.getDisplayMedia({
					audio: true, 
					video: { mediaSource: "screen"}
				});

				let recordedChunks = []; 
				const mediaRecorder = new MediaRecorder(stream);
				mediaRecorder.ondataavailable = function (e) {
					if (e.data.size > 0) {
						recordedChunks.push(e.data);
					}  
				};
				mediaRecorder.onstop = function () {

					const blob = new Blob(recordedChunks, {
						type: 'video/webm'
					});
					let filename = window.prompt('Enter file name'),
					downloadLink = document.createElement('a');
					downloadLink.href = URL.createObjectURL(blob);
					downloadLink.download = `${filename}.webm`;

					document.body.appendChild(downloadLink);
					downloadLink.click();
					URL.revokeObjectURL(blob); // clear from memory
					document.body.removeChild(downloadLink);

					recordedChunks = [];
				};
				mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.

				let node = document.createElement("p");
				node.textContent = "Started recording";
				document.body.appendChild(node);
			}
			else {
				mediaRecorder.stop();
				let node = document.createElement("p");
				node.textContent = "Stopped recording";
				document.body.appendChild(node);
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