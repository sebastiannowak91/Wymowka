
const articles = document.querySelector(".to-read");
const closeContactFormBtn = document.querySelector(".close-contact-form");
const contactForm = document.querySelector(".contact-form");
const sendBtn = document.querySelector(".send-btn");
const mustBe = Array.from(document.querySelectorAll(".must-be"));
const email = document.querySelector(".email-address");
const feedback = document.querySelector(".form-feedback");
const feedback2 = document.querySelector(".form-feedback2");



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
            feedback.textContent = "Proszę uzupełnić wszystkie pola oznaczone *";
        };
    });
    if (isEmailOK() === false) {
        readyToSend = false;
    };
    if (readyToSend === true) {
        feedback.textContent = "Wiadomość została wysłana.";
        feedback2.textContent = null;
        mustBe.forEach(function (input) {
            input.value = "";
            sendBtn.style.display = "none";
            feedback.classList.add("confirmation");
        })
    }
};

// function sendMessage(event) {
//     event.preventDefault();
//     areMustBeFilled();
// };

// function areMustBeFilled() {
//     mustBe.forEach(mustBe => mustBe.value === "") ? feedback.textContent = "Proszę uzupełnić wszystkie pola oznaczone *" : console.log('wszystko wupełnione'); 
// };

function isEmailOK() {
    const pattern = /(([a-z0-9_-]){1,}\.?)(([a-z0-9]){1,})@(([a-z0-9]){1,}\.){1,}([a-z]){2,}/i;
    if (pattern.test(email.value) === false) {
        feedback2.textContent = "Niepoprawny adres email";
        return false;
    } else {
        return true;
    }
};

export { applyContactFormEventListeners };