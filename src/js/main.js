// Import our custom CSS
import "../scss/styles.scss";
import { SelectConstructor } from "./select";
import "./dynamicAdapt";

// Import only the Bootstrap components we need
import { Modal } from "bootstrap";

new SelectConstructor({});

const menuToggleHandler = (btnSelector, value) => {
	const btn = document.querySelector(btnSelector);

	btn.addEventListener("click", (e) => {
		document.body.classList.toggle("menu-open");
	});
};

menuToggleHandler(".menu-btn");
menuToggleHandler(".menu-background");

// Modal Form
const createShopModal = document.getElementById("create-shop");
const modalCloseBtn = createShopModal.querySelector(".btn-close");
const modalForm = createShopModal.querySelector(".modal-form");
const domainInput = document.getElementById("domain");
const domainInputWrapper = domainInput.closest(".input-group");
const submitBtn = createShopModal.querySelector('[type="submit"]');
const LENGTH_ERROR_MESSAGE = "Введите не менее 2 символов";
const VALIDATE_ERROR_MESSAGE =
	"В названии домена разрешены только латиница и “-”";

const setErrorMessage = (
	wrapperElement,
	message,
	errorClass = "error-message"
) => {
	const errorElement = wrapperElement.querySelector(`.${errorClass}`);

	if (errorElement) {
		errorElement.textContent = message;
		return;
	}

	wrapperElement.insertAdjacentHTML(
		"beforeend",
		`<div class="${errorClass}">${message}</div>`
	);
};

const removeErrorMessage = (
	wrapperElement,
	errorElementSelector = ".error-message"
) => {
	const errorMessageElement =
		wrapperElement.querySelector(errorElementSelector);
	if (!errorMessageElement) return;

	errorMessageElement.remove();
};

const domainInputHandler = (e) => {
	const value = e.target.value;

	if (!/^[a-zA-Z-]+$/.test(value)) {
		submitBtn.disabled = true;
		setErrorMessage(domainInputWrapper, VALIDATE_ERROR_MESSAGE);
	} else if (value.length < 2) {
		submitBtn.disabled = true;
		setErrorMessage(domainInputWrapper, LENGTH_ERROR_MESSAGE);
	} else {
		submitBtn.disabled = false;
		removeErrorMessage(domainInputWrapper);
	}
};

domainInput.addEventListener("input", domainInputHandler);

const onSubmit = (e) => {
	e.preventDefault();

	const form = e.currentTarget;
	const formData = new FormData(form);

	const domain = formData.get("domain");
	const template = formData.get("template");
	const color = formData.get("color");

	console.log(
		`
		domain: ${domain}.work5.ru\n
		template: ${template}\n
		color: ${color}
		`
	);
	modalCloseBtn.click();
};

modalForm.addEventListener("submit", onSubmit);

const onWindowClick = () => {
	document.body.classList.add("mouse-clicked");
};

const onTabClick = (e) => {
	if (e.code === "Tab") {
		document.body.classList.remove("mouse-clicked");
	}
};

window.addEventListener("click", onWindowClick);
window.addEventListener("keydown", onTabClick);
