
const crtfCollection = document.querySelector(".certificates-collection");
const certificates = Array.from(document.querySelectorAll(".certificate"));
const closeCrtf = document.querySelector(".close-crtf");
const nextCrtf = document.querySelector(".next-crtf");
const prevCrtf = document.querySelector(".prev-crtf");
const crtfNav = document.querySelector(".certificates-navigation");
const crtfNavBtns = Array.from(document.querySelectorAll(".crtf-nav-btns"));
let certificate;
let currentCertificate;

export function showCrtf() {
    if(crtfCollection.matches('show-crtf-collection')) {
        return;
    }
    findMatchingCrtf(event);
    showCrtfNav();
    applyCrtfEventListeners();
};

function findMatchingCrtf(event) {
    const {id} = event.currentTarget;
    crtfCollection.classList.add('show-crtf-collection');
    const certificate = certificates.find(certificate => certificate.getAttribute('aria-labelledby') === id);
    certificate.hidden = false;
    currentCertificate = certificate;
};

function showCrtfNav() {
    crtfNav.style.display = "flex";
    if (certificates.indexOf(currentCertificate) !== 0 && certificates.indexOf(currentCertificate) !== certificates.length -1 ) { 
        crtfNavBtns.forEach(crtfNavBtn => crtfNavBtn.style.display = "flex");
    } if (certificates.indexOf(currentCertificate) === 0) {
        prevCrtf.style.display = "none";
        nextCrtf.style.display = "flex";
    } if (certificates.indexOf(currentCertificate) === certificates.length -1 ) {
        nextCrtf.style.display = "none";
        prevCrtf.style.display = "flex";
    };
};

function applyCrtfEventListeners() {
    nextCrtf.addEventListener('click', navigateCrtf);
    prevCrtf.addEventListener('click', () => navigateCrtf('back'));
    closeCrtf.addEventListener('click', closeCrtfCollection);
};

function navigateCrtf(direction) {
    certificate = certificates.indexOf(currentCertificate);
    const prevCertificate = certificates[certificate - 1];
    const nextCertificate = certificates[certificate + 1];

    hideCrtf();
    if (direction === 'back') {
        currentCertificate = prevCertificate;
        currentCertificate.hidden = false;
    } else {
        currentCertificate = nextCertificate;
        currentCertificate.hidden = false;
    };
    showCrtfNav();
};


function hideCrtf() {
    certificates.forEach(certificate => {
        certificate.hidden = true
    });
};

function closeCrtfCollection() {
    crtfCollection.classList.remove('show-crtf-collection');
    hideCrtf();
    removeCrtfEventListeners();
    crtfNav.style.display = "none";
};

function removeCrtfEventListeners() {
    nextCrtf.removeEventListener('click', navigateCrtf);
    prevCrtf.removeEventListener('click', () => navigateCrtf('back'));
    closeCrtf.removeEventListener('click', closeCrtfCollection);
};


