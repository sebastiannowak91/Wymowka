
//ARTICLES//

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
        showNavigationButtons();
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
    showArticle();
    showNavigationButtons();
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
// let current;
// let prev;
// let next;

const crtfBtn = crtfBtns.forEach(crtfBtn => crtfBtn.addEventListener("click", showCrtf));
nextCrtf.addEventListener('click', navigateCrtf);
prevCrtf.addEventListener('click', () => navigateCrtf('back'));

function showCrtf() {
    openCrtfCollection();
    // hideCrtf();
    findMatchingCrtf(event);
};

function hideCrtf() {
    certificates.forEach(certificate => {
        certificate.hidden = true
    });
};

function openCrtfCollection() {
    if(crtfCollection.matches('open')) {
        return;
    }
    findMatchingCrtf(event);
    // crtfCollection.classList.add('show');
    // prevCrtf.addEventListener('click', () => navigate('back'));
    // nextCrtf.addEventListener('click', navigate);
    // closeCrtf.addEventListener('click', closeCrtfCollection);
    crtfNavBtns.style.display = "flex";
};

function findMatchingCrtf(event) {
    const {id} = event.currentTarget;
    crtfCollection.classList.add('show');
    const certificate = certificates.find(certificate => certificate.getAttribute('aria-labelledby') === id);
    certificate.hidden = false;
    currentCertificate = certificate;
};

function navigateCrtf(direction) {
    certificate = certificates.indexOf(currentCertificate);
    const prevCertificate = certificates[certificate - 1];
    const nextCertificate = certificates[certificate + 1];
    console.log(currentCertificate);

    hideCrtf();
    if (direction === 'back') {
        currentCertificate = prevCertificate;
        currentCertificate.hidden = false;
    } else {
        currentCertificate = nextCertificate;
        currentCertificate.hidden = false;
    };
};

function closeCrtfCollection() {
    crtfCollection.classList.remove('open');
    // nextCrtf.removeEventListener('click', showNextCrtf);
    // prevCrtf.removeEventListener('click', showPrevCrtf);
    closeCrtf.removeEventListener('click', closeCrtfCollection);
    crtfNavBtns.style.display = "none";
    current.style.display = "none";
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