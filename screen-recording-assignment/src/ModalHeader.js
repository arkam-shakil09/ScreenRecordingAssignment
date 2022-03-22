import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';

function ModalHeaderTitle(props)
{
	return (
		<>
			<h2 class="modal-title" id="user-management-modal-title">{props.modaltitle}</h2>
		</>
	);
}

function ModalHeaderCloseButton()
{
	let hideModal = (modalSelector, triggeredElement, event) =>
	{
		document.querySelector(modalSelector).classList.remove("show");
		document.querySelector(modalSelector).classList.add("hidden");
		document.querySelector(triggeredElement).classList.remove("element-opacity");
			document.querySelector("body").classList.remove("element-opacity");
		document.querySelector(triggeredElement).focus();
		window.history.back();
	}

	return (
		<>
			<button class="close" id="user-management-modal-close-button" onClick={(event) => hideModal("#user-management-modal-container", "#user-management-button", event)} aria-label="close" title="close">
				<i class="fa fa-close" aria-hidden="true"></i>
			</button>
		</>
	);
}

function ModalHeader()
{
	return (
		<>
			<div class="modal-header" id="user-management-modal-header">
				<ModalHeaderTitle modaltitle="Personal Details" />
				<ModalHeaderCloseButton />
			</div>
		</>
	);
}

export default ModalHeader;