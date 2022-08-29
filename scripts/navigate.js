// import { tabPanels, tabPanel, currentTabPanel, tabButton, currentTabButton, closeWhatsOpen, down, showArticle, showNavigationButtons, colorIt, findMatchingTabpanel } from './tabs.js';
// import { tabButtons } from './script.js'; 
// import wait from './helpers.js';

// async function navigate(direction) {
//     tabPanel = tabPanels.indexOf(currentTabPanel);
//     let prevTabPanel = tabPanels[tabPanel - 1];
//     let nextTabPanel = tabPanels[tabPanel + 1];

//     tabButton = tabButtons.indexOf(currentTabButton);
//     let prevTabButton = tabButtons[tabButton - 1];
//     let nextTabButton = tabButtons[tabButton + 1];

//     closeWhatsOpen();
//     await wait(10);
//     if (direction === 'back') {
//         currentTabPanel = prevTabPanel;
//         currentTabButton = prevTabButton;
//     } else {
//         currentTabPanel = nextTabPanel;
//         currentTabButton = nextTabButton;
//     }
//     currentTabPanel.hidden = false;
//     currentTabButton.setAttribute('aria-selected', true);
//     currentTabButton.setAttribute('open', true);
//     down();
//     showArticle();
//     showNavigationButtons();
//     colorIt();
// };

// export default navigate;