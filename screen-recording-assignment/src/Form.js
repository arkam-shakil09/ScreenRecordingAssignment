import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import './index.css';
import TextField from './TextField.js';
import Checkbox from './Checkbox.js';


function Form()
{
	return (
		<>
			<form>
				<TextField label="First name" type="text" requiredfield="required" 	/>
				<TextField label="Last name" type="text" requiredfield="required" />
				<TextField label="Age" type="number" requiredfield="required" />

				<fieldset>
					<legend>Favourite fruites</legend>
					<Checkbox label="Apple" />
					<Checkbox label="Mango" />
					<Checkbox label="Banana" />
					<Checkbox label="Orange" />
				</fieldset>

				<label>Favourite car? <br />
					<select name="cars" id="cars">
						<option value="volvo">Volvo</option>
						<option value="saab">Saab</option>
						<option value="mercedes">Mercedes</option>
							<option value="audi">Audi</option>
					</select>
				</label><br />

				<button type="button">Next</button>
			</form>
		</>
	);
}

export default Form;