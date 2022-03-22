import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';


function FrontButton()
{
	let showModal = (modalSelector, firstInteractiveElementOfModal, event) =>
	{
		event.target.classList.add("element-opacity");
		document.querySelector("body").classList.add("element-opacity");
		document.querySelector(modalSelector).classList.remove("hidden");
		document.querySelector(modalSelector).classList.add("show");
		document.querySelector(firstInteractiveElementOfModal).focus();
		window.history.pushState("Personal Details", "Personal Details", "/personal-details");
	}

	return <button id="user-management-button" onClick={(event) => showModal("#user-management-modal-container", "#user-management-modal-close-button", event)}>Personal Details</button>;
}

export default FrontButton;