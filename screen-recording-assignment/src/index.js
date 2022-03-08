import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import './index.css';
import FrontButtonDiv from './FrontButtonDiv.js';
import ModalContainer from './ModalContainer.js';
import RecordingButton from './RecordingButton.js';


function App()
{
	let [eventCapturing] = useState(0);

	useEffect(() =>
	{
		let events = ["click", "focus", "keydown", "keypressed"];
		for(let i=0; i<events.length; i++)
		{
			window.addEventListener("" + events[i] + "", function (event) { 
				myFunction(event);
			}, false);
		}

		function myFunction(e)
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
				// Get tag name of Events Target
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

			let msg = "\n EventType: " + et + ", EventTarget: " + trgt + ", Event Tag name: " + trgtTagName + ", Element Name: " + trgtName + ", Event Id: " + trgtId + ", Event Class: " + trgtClass + ", Extra:" + xtra;
			let p = document.createElement('P');
			p.innerText = msg;
			document.body.appendChild(p);
//				alert("\n EventType: " + et + ", EventTarget: " + trgt + ", Event Id: " + trgtId + ", Event Class: " + trgtClass + ", Extra:" + xtra);
			}
		}
	}, []);

	return (
		<>
			<FrontButtonDiv />
			<ModalContainer />
			<RecordingButton />
		</>
	);
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
