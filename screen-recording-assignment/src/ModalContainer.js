import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';
import Modal from './Modal.js';

function ModalContainer()
{
	return (
		<>
			<div class="modal fade hidden" id="user-management-modal-container">
				<Modal />
			</div>
		</>
	);
}

export default ModalContainer;