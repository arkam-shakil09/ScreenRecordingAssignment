import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';
import FrontButton from './FrontButton.js';

function FrontButtonDiv()
{
	return (
		<>
			<div id="front-button-div">
				<FrontButton />
			</div>
		</>
	);
}


export default FrontButtonDiv;