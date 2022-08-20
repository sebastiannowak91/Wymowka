
const articles = document.querySelector(".to-read");
const closeContactFormBtn = document.querySelector(".close-contact-form");
const contactForm = document.querySelector(".contact-form");
const sendBtn = document.querySelector(".send-btn");
const mustBe = document.querySelectorAll(".must-be");
const feedback = document.querySelector(".form-feedback");



function applyContactFormEventListeners() {
    closeContactFormBtn.addEventListener("click", closeContactForm);
    sendBtn.addEventListener("click", sendMessage);
};

function closeContactForm() {
    contactForm.style.display = "none";
};

function sendMessage(event) {
    event.preventDefault();
    let readyToSend = true;
    mustBe.forEach(function (input) {
        if (input.value === "") {
            readyToSend = false;
        }
    })
    if (readyToSend === true) {
        feedback.textContent = "Wiadomość została wysłana.";
        mustBe.forEach(function (input) {
            input.value = "";
            sendBtn.style.display = "none";
            feedback.classList.add("confirmation");
        })
    } else {
        feedback.textContent = "Proszę uzupełnić wszystkie pola oznaczone *";
    }
};

export { applyContactFormEventListeners };