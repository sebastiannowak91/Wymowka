import { handleTabClick } from './tabs.js';
import showText from './to-read.js';
import { showCrtf } from './certificates.js';
import { applyContactFormEventListeners } from './contact-form.js';

//ARTICLES//
const tabs = document.querySelector('.tabs');
export const tabButtons = Array.from(tabs.querySelectorAll('[role="tab"]'));

tabButtons.forEach(tabButton => tabButton.addEventListener('click', handleTabClick));


//CERTIFICATES//
const crtfBtns = Array.from(document.querySelectorAll(".crtf-btn"));

const crtfBtn = crtfBtns.forEach(crtfBtn => crtfBtn.addEventListener("click", showCrtf));


//TO READ//
const articles = document.querySelector(".to-read");
const readBtns = articles.querySelectorAll(".read-article-btn");

readBtns.forEach(readBtn => readBtn.addEventListener("click", showText));


//CONTACT FORM//
const openContactFormBtn = document.querySelector(".open-form");
const contactForm = document.querySelector(".contact-form");

openContactFormBtn.addEventListener("click", function() {
    contactForm.style.display = "flex";
    applyContactFormEventListeners();
});