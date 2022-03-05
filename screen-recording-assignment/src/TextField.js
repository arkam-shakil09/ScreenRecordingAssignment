import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import './index.css';

function TextField(props)
{
	return (
		<>
			<label>{props.label}<br />
				<input type={props.type} required={props.requiredfield} /><br />
			</label>
		</>
	);
}

export default TextField;