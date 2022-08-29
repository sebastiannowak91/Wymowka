import { tabPanels, tabPanel, currentTabPanel } from './tabs.js';

export function navigate(direction) {
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
        // currentTabPanel.setAttribute('hidden', false);
        currentTabButton = prevTabButton;
        currentTabButton.setAttribute('aria-selected', true);
        currentTabButton.setAttribute('open', true);
    } else {
        currentTabPanel = nextTabPanel;
        // currentTabPanel.setAttribute('hidden', false);
        currentTabPanel.hidden = false;
        currentTabButton = nextTabButton;
        currentTabButton.setAttribute('aria-selected', true);
        currentTabButton.setAttribute('open', true);
    }
};