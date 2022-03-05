import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import FrontButtonDiv from './FrontButtonDiv.js';
import ModalContainer from './ModalContainer.js';
import RecordingButton from './RecordingButton.js';


export default function App()
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
