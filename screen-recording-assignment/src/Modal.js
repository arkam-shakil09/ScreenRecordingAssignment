import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';
import ModalHeader from './ModalHeader.js';
import ModalBody from './ModalBody.js';
import ModalFooter from './ModalFooter.js';

function Modal()
{
	let restrictKeyboardFocusWithInTheModalAndCloseTheModalOnEscapeKey = (modalSelector, triggeredElement, event) =>
	{
		let  focusableElements = "button, a, input, [tabindex='0']";
		let modal = document.querySelector(modalSelector);
		let firstInteractiveElement = modal.querySelectorAll(focusableElements)[0];
		let focusableContent = modal.querySelectorAll(focusableElements);
		let lastInteractiveElement = focusableContent[focusableContent.length - 1];
		let keyPressedByUser = event.key;

		if (keyPressedByUser == "Escape")
		{
			document.querySelector(modalSelector).classList.remove("show");
			document.querySelector(modalSelector).classList.add("hidden");
			document.querySelector(triggeredElement).classList.remove("element-opacity");
			$("body").removeAttr("style");
			document.querySelector(triggeredElement).focus();
			window.history.back();
		}
		if (keyPressedByUser == "Tab")
		{
			if (event.shiftKey == true)
			{
				if (document.activeElement == firstInteractiveElement)
				{
					event.preventDefault();
					lastInteractiveElement.focus();
				}
			}
			else {
				if (document.activeElement == lastInteractiveElement)
				{
					event.preventDefault();
					firstInteractiveElement.focus();
				}
			}
		}
	}
	return (
		<>
			<div class="modal-dialog modal-lg" id="user-management-modal" role="dialog" aria-modal="true" aria-labelledby="user-management-modal-title" onKeyDown={(event) => restrictKeyboardFocusWithInTheModalAndCloseTheModalOnEscapeKey("#user-management-modal-container", "#user-management-button", event)}>
				<div class="modal-content">
					<ModalHeader />
					<ModalBody />
					<ModalFooter />
			</div>
			</div>
		</>
	);
}

export default Modal;