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
