
//ARTICLES//

// const articles = document.querySelectorAll(".article");
// const figures = document.querySelectorAll(".figure");
// const overlines = document.querySelectorAll(".overline");


// for (let i = 0; i < figures.length; i++) {
//     figures[i].addEventListener("click", showHideArticle);
// };

// let currentArticleIndex = 0;

// function showHideArticle() {
//     let id = this.id;
//     id = id.replace("-figure", "");
//     for (let i = 0; i < articles.length; i++) {
//         if (id === articles[i].id) {
//             if (articles[i].style.display === "none" || articles[i].style.display === "") {
//                 currentArticleIndex = i;
//                 showArticle(i);
//                 window.scroll ({
//                     top: 600,
//                     left: 0,
//                     behavior: "smooth"
//                 });
//             } else if (articles[i].style.display === "block") {
//                 hideArticle(i);
//             }
//         } else {
//             overlines[i].classList.remove("overline-on");
//             articles[i].classList.remove("show-article");
//             articles[i].style.display = "none";
//             figures[i].classList.remove("highlight");
//         }
//     }
// };

// function showArticle(i) {
//     figures[i].classList.add("highlight");
//     overlines[i].classList.remove("overline-off");
//     overlines[i].classList.add("overline-on");
//     articles[i].style.display = "block";
//     articles[i].classList.remove("hide-article");
//     setTimeout (function () {
//         articles[i].classList.add("show-article")}, 500);
// };

// function hideArticle(i) {
//     articles[i].classList.add("hide-article");
//     articles[i].classList.remove("show-article");
//     overlines[i].classList.add("overline-off");
//     setTimeout (function() {
//         articles[i].style.display = "none"}, 700);
//     figures[i].classList.remove("highlight");
//     setTimeout (function() {
//         overlines[i].classList.remove("overline-on")}, 700);    
// };

const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(event) {
    tabPanels.forEach(tabPanel => {
        tabPanel.hidden = true
    });
    tabButtons.forEach(tabButton => {
        tabButton.setAttribute('aria-selected', false);
    });
    event.currentTarget.setAttribute('aria-selected', true);
    const {id} = event.currentTarget;

    const tabPanel = tabPanels.find(tabPanel => tabPanel.getAttribute('aria-labelledby') === id);
    tabPanel.hidden = false;
};

tabButtons.forEach(tabButton => tabButton.addEventListener('click', handleTabClick));



// //BACK UP//
// const backUp = document.querySelectorAll(".go-up");

// backUp.forEach(function (button) {
//     button.addEventListener("click", goUp);
// });

// function goUp() {
//         window.scroll ({
//             top: 600,
//             left: 0,
//             behavior: "smooth"
//         });
//         for (let i = 0; i < articles.length; i++) { 
//             setTimeout (function() {
//                 hideArticle(i)}, 300);
//         }
// };


// //GO RIGHT//
// const goRightBtns = document.querySelectorAll(".go-right");

// goRightBtns.forEach(function (button) {
//     button.addEventListener("click", goRight);
// });

// function goRight() {
//     window.scroll ({
//         top: 600,
//         left: 0,
//         behavior: "smooth"
//     });
//     hideArticle(currentArticleIndex);
//     currentArticleIndex += 1;
//     setTimeout (function() {
//         showArticle(currentArticleIndex)}, 300);
// };

//CERTIFICATES//
const crtfBtns = document.querySelectorAll(".crtf-btn");
const crtfCollection = document.querySelector(".certificates-collection");
const certificates = document.querySelectorAll(".certificate");
const closeCrtf = document.querySelector(".close-crtf");
const nextCrtf = document.querySelector(".next-crtf");
const prevCrtf = document.querySelector(".prev-crtf");

for (let i = 0; i < crtfBtns.length; i++) {
    crtfBtns[i].addEventListener("click", showCrtf);
};

let currentCrtfIndex = 0;

function showCrtf() {
    let id = this.id;
    id = id.replace("-btn", "");
    for (let i = 0; i < certificates.length; i++) {
        if (id === certificates[i].id) {
            currentCrtfIndex = i;
            crtfCollection.style.display = "flex";
            certificates[i].style.display = "block";
            showHideArrow();
        } else {
            certificates[i].style.display = "none";
        }
    }
};


closeCrtf.addEventListener("click", function() {
    crtfCollection.style.display = "none";
    certificates[currentCrtfIndex].style.display = "none";
});

nextCrtf.addEventListener("click", function() {
    certificates[currentCrtfIndex].style.display = "none";
    currentCrtfIndex += 1;
    certificates[currentCrtfIndex].style.display = "block";
    showHideArrow(); 
});

prevCrtf.addEventListener("click", function() {
    certificates[currentCrtfIndex].style.display = "none";
    currentCrtfIndex -= 1;
    certificates[currentCrtfIndex].style.display = "block"; 
    showHideArrow(); 
});

function showHideArrow() {
    if (currentCrtfIndex == 0) {
        prevCrtf.style.display = "none";
        nextCrtf.style.display = "block";
    } else if (currentCrtfIndex == certificates.length -1) {
            nextCrtf.style.display = "none";
            prevCrtf.style.display = "block";
    } else {
            prevCrtf.style.display = "block";
            nextCrtf.style.display = "block";
    }
};


//CONTACT FORM//
openContactFormBtn = document.querySelector(".open-form");
closeContactFormBtn = document.querySelector(".close-contact-form");
contactForm = document.querySelector(".contact-form");
sendBtn = document.querySelector(".send-btn");
mustBe = document.querySelectorAll(".must-be");
feedback = document.querySelector(".form-feedback");


openContactFormBtn.addEventListener("click", function() {
    contactForm.style.display = "flex";
});

closeContactFormBtn.addEventListener("click", function() {
    contactForm.style.display = "none";
});

sendBtn.addEventListener("click", function(event) {
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
});