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
