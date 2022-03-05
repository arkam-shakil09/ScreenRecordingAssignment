import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';
import Form from './Form.js';


function ModalBody()
{
	return (
		<>
			<div class="modal-body" id="user-management-modal-body">
				<Form />
			</div>
		</>
	);
}

export default ModalBody;