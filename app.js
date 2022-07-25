
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
const tabButtons = Array.from(tabs.querySelectorAll('[role="tab"]'));
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));
const overline = tabs.querySelector(".overline");

function wait(ms = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
};

async function showArticle() {
    await wait(100);
    currentTabPanel.classList.add('show-article');
    overline.classList.add("overline-on");
}

function up() {
    document.getElementById("jump-up-here").scrollIntoView({behavior: 'smooth'});
};

function down() {
    document.getElementById("jump-down-here").scrollIntoView({behavior: 'smooth'});
}


function closeWhatsOpen() {
    tabPanels.forEach(tabPanel => {
        tabPanel.classList.remove('show-article')
        tabPanel.hidden = true
    });
    tabButtons.forEach(tabButton => {
        tabButton.setAttribute('aria-selected', false);
        tabButton.removeAttribute('open', false);
    });
    overline.classList.remove("overline-on");
    overline.classList.remove("overline-off");
};

function findMatchingTabpanel(event) {
    event.currentTarget.setAttribute('aria-selected', true);
    event.currentTarget.setAttribute('open', true);
    const {id} = event.currentTarget;
    const tabPanel = tabPanels.find(tabPanel => tabPanel.getAttribute('aria-labelledby') === id);
    tabPanel.hidden = false;
    currentTabPanel = tabPanel;
    const tabButton = tabButtons.find(tabButton => tabButton.id === tabPanel.getAttribute('aria-labelledby'));
    currentTabButton = tabButton;
}


function applyEvenListeners() {
}


async function close() {
    up();
    overline.classList.add('overline-off');
    await wait (750);
    closeWhatsOpen();
    navigation.classList.remove('show');
    // overline.classList.remove('overline-on');
    //remov classes
    //remove addEventListeners
    //close div with buttons;
}

function handleTabClick(event) {
    if (event.currentTarget.hasAttribute('open')) {
        close();
    } else {
        closeWhatsOpen();
        findMatchingTabpanel(event);
        down();
        showArticle();
    }
}

const navigation = tabs.querySelector(".go-right-go-up");
const navigationBtns = tabs.querySelectorAll(".navigation-btn");
const backUp = tabs.querySelector(".go-up");
const goRightBtn = tabs.querySelector(".go-right");
const goLeftBtn = tabs.querySelector(".go-left");

function showNavigationButtons() {
    navigation.classList.add('show');
    if (tabPanels.indexOf(currentTabPanel) !== 0 && tabPanels.indexOf(currentTabPanel) !== tabPanels.length -1 ) { 
        navigationBtns.forEach(navigationBtn => navigationBtn.style.display = "flex");
    } if (tabPanels.indexOf(currentTabPanel) === 0) {
        goLeftBtn.style.display = "none";
        goRightBtn.style.display = "flex";
    } if (tabPanels.indexOf(currentTabPanel) === tabPanels.length -1 ) {
        goRightBtn.style.display = "none";
        goLeftBtn.style.display = "flex";
    };
};

function navigate(direction) {
    tabPanel = tabPanels.indexOf(currentTabPanel);
    const prevTabPanel = tabPanels[tabPanel - 1];
    const nextTabPanel = tabPanels[tabPanel + 1];

    tabButton = tabButtons.indexOf(currentTabButton);
    const prevTabButton = tabButtons[tabButton - 1];
    const nextTabButton = tabButtons[tabButton + 1];

    closeWhatsOpen();
    if (direction === 'back') {
        currentTabPanel = prevTabPanel;
        currentTabPanel.hidden = false;
        currentTabButton = prevTabButton;
        currentTabButton.setAttribute('aria-selected', true);
        currentTabButton.setAttribute('open', true);
    } else {
        currentTabPanel = nextTabPanel;
        currentTabPanel.hidden = false;
        currentTabButton = nextTabButton;
        currentTabButton.setAttribute('aria-selected', true);
        currentTabButton.setAttribute('open', true);
    }
    down();
    showNavigationButtons();
    showArticle();
};

backUp.addEventListener("click", close);
goRightBtn.addEventListener("click", navigate);
goLeftBtn.addEventListener("click", () => navigate('back'));

tabButtons.forEach(tabButton => tabButton.addEventListener('click', handleTabClick));





//CERTIFICATES//
const crtfBtns = Array.from(document.querySelectorAll(".crtf-btn"));
const crtfCollection = document.querySelector(".certificates-collection");
const certificates = Array.from(document.querySelectorAll(".certificate"));
const closeCrtf = document.querySelector(".close-crtf");
const nextCrtf = document.querySelector(".next-crtf");
const prevCrtf = document.querySelector(".prev-crtf");
const crtfNavBtns = document.querySelector(".certificates-navigation");
let current;
let prev;
let next;

const crtfBtn = crtfBtns.forEach(crtfBtn => crtfBtn.addEventListener("click", showCrtf));

function showCrtf() {
    openCrtfCollection()
    showCurrentCrtf(event)
};

function openCrtfCollection() {
    if(crtfCollection.matches('open')) {
        return;
    }
    crtfCollection.classList.add('open');
    prevCrtf.addEventListener('click', () => move('back'));
    nextCrtf.addEventListener('click', move);
    closeCrtf.addEventListener('click', closeCrtfCollection);
    crtfNavBtns.style.display = "flex";
};

function showCurrentCrtf(event) {
    const {id} = event.currentTarget;
    crtfCollection.classList.add('open');
    const certificate = certificates.find(certificate => certificate.getAttribute('aria-labelledby') === id);
    certificate.style.display = "flex";
    current = certificate;
    prev = current.previousElementSibling || crtfCollection.lastElementChild;
    next = current.nextElementSibling || crtfCollection.firstElementChild;
    applyClasses();
};

function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
}

// function move(direction) {
//     //first strip all the classes off the current slides
//     current.style.display = "none";
//     const classesToRemove = ['prev', 'current', 'next'];
//     prev.classList.remove(...classesToRemove);
//     current.classList.remove(...classesToRemove);
//     next.classList.remove(...classesToRemove);
//     if (direction === 'back') {
//         [prev, current, next] = [
//             //get the prev slide, if there is none, get the last slide from the entire slider
//             prev.previousElementSibling || crtfCollection.lastElementChild,
//             prev, 
//             current];
//     } else { 
//         [prev, current, next] = [
//             current, 
//             next, 
//             next.nextElementSibling || crtfCollection.firstElementChild,
//         ];
//     }
//     current.style.display = "flex";
//     applyClasses();
// }

function closeCrtfCollection() {
    crtfCollection.classList.remove('open');
    // nextCrtf.removeEventListener('click', showNextCrtf);
    // prevCrtf.removeEventListener('click', showPrevCrtf);
    closeCrtf.removeEventListener('click', closeCrtfCollection);
    crtfNavBtns.style.display = "none";
    current.style.display = "none";
    current.classList.remove('current');
    prev.classList.remove('prev');
    next.classList.remove('next');
};



// closeCrtf.addEventListener("click", function() {
//     crtfCollection.style.display = "none";
//     certificates[currentCrtfIndex].style.display = "none";
// });

// nextCrtf.addEventListener("click", function() {
//     certificates[currentCrtfIndex].style.display = "none";
//     currentCrtfIndex += 1;
//     certificates[currentCrtfIndex].style.display = "block";
//     showHideArrow(); 
// });

// prevCrtf.addEventListener("click", function() {
//     certificates[currentCrtfIndex].style.display = "none";
//     currentCrtfIndex -= 1;
//     certificates[currentCrtfIndex].style.display = "block"; 
//     showHideArrow(); 
// });

// function showHideArrow() {
//     if (currentCrtfIndex == 0) {
//         prevCrtf.style.display = "none";
//         nextCrtf.style.display = "block";
//     } else if (currentCrtfIndex == certificates.length -1) {
//             nextCrtf.style.display = "none";
//             prevCrtf.style.display = "block";
//     } else {
//             prevCrtf.style.display = "block";
//             nextCrtf.style.display = "block";
//     }
// };


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