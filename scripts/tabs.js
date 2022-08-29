import wait from './helpers.js';
import { tabButtons } from './script.js';
// import navigate from './navigate.js';

const tabs = document.querySelector('.tabs');
// const tabButtons = Array.from(tabs.querySelectorAll('[role="tab"]'));
export const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));
const overline = tabs.querySelector(".overline");
export let tabPanel;
export let currentTabPanel;
export let tabButton;
export let currentTabButton;


export function handleTabClick(event) {
    if (event.currentTarget.hasAttribute('open')) {
        close();
    } else {
        closeWhatsOpen();
        findMatchingTabpanel(event);
        down();
        showArticle();
        showNavigationButtons();
        colorIt();
        applyEventListeners();
    };
};

export function closeWhatsOpen() {
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

export function findMatchingTabpanel(event) {
    event.currentTarget.setAttribute('aria-selected', true);
    event.currentTarget.setAttribute('open', true);
    let {id} = event.currentTarget;
    let tabPanel = tabPanels.find(tabPanel => tabPanel.getAttribute('aria-labelledby') === id);
    currentTabPanel = tabPanel;
    tabPanel.hidden = false;
    let tabButton = tabButtons.find(tabButton => tabButton.id === tabPanel.getAttribute('aria-labelledby'));
    currentTabButton = tabButton;
};

export function down() {
    document.getElementById("jump-down-here").scrollIntoView({behavior: 'smooth'});
};

export async function showArticle() {
    await wait(100);
    currentTabPanel.classList.add('show-article');
    overline.classList.add("overline-on");
};

export function colorIt() {
    let tabButton = tabButtons.find(tabButton => tabButton.hasAttribute('open'));
    let nextTabButton = tabButton.nextElementSibling;
    let prevTabButton = tabButton.previousElementSibling;
    
    let color = tabButton.getAttribute('data-color');
    let nextColor = nextTabButton? nextTabButton.getAttribute('data-color') : null;
    let prevColor = prevTabButton ? prevTabButton.getAttribute('data-color') : null;

    const arrowUp = tabs.querySelector(".fa-chevron-circle-up");
    const arrowRight = tabs.querySelector(".fa-chevron-circle-right");
    const arrowLeft = tabs.querySelector(".fa-chevron-circle-left");

    overline.style.color = color;
    arrowUp.style.color = color;
    arrowRight.style.color = nextColor;
    arrowLeft.style.color = prevColor;
};

const navigation = tabs.querySelector(".go-right-go-up");
const navigationBtns = tabs.querySelectorAll(".navigation-btn");
const backUp = tabs.querySelector(".go-up");
const goRightBtn = tabs.querySelector(".go-right");
const goLeftBtn = tabs.querySelector(".go-left");

export function showNavigationButtons() {
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

function applyEventListeners() {
    backUp.addEventListener("click", close);
    goRightBtn.addEventListener("click", navigate);
    goLeftBtn.addEventListener("click", () => navigate('back'));
};

async function navigate(direction) {
    tabPanel = tabPanels.indexOf(currentTabPanel);
    const prevTabPanel = tabPanels[tabPanel - 1];
    const nextTabPanel = tabPanels[tabPanel + 1];

    tabButton = tabButtons.indexOf(currentTabButton);
    const prevTabButton = tabButtons[tabButton - 1];
    const nextTabButton = tabButtons[tabButton + 1];

    closeWhatsOpen();
    await wait(10);
    if (direction === 'back') {
        currentTabPanel = prevTabPanel;
        currentTabButton = prevTabButton;
    } else {
        currentTabPanel = nextTabPanel;
        currentTabButton = nextTabButton;
    }
    currentTabPanel.hidden = false;
    currentTabButton.setAttribute('aria-selected', true);
    currentTabButton.setAttribute('open', true);
    down();
    showArticle();
    showNavigationButtons();
    colorIt();
};

async function close() {
    up();
    overline.classList.add('overline-off');
    await wait (750);
    closeWhatsOpen();
    navigation.classList.remove('show');
    removeEventListeners();
};

function up() {
    document.getElementById("jump-up-here").scrollIntoView({behavior: 'smooth'});
};

function removeEventListeners() {
    backUp.removeEventListener("click", close);
    goRightBtn.removeEventListener("click", navigate);
    goLeftBtn.removeEventListener("click", () => navigate('back'));
};