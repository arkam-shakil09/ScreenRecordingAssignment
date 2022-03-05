import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import './index.css';

function Checkbox(props)
{
	return (
		<>
			<label>
				<input type="checkbox" />
				{props.label}<br />
			</label>
		</>
	);
}

export default Checkbox;