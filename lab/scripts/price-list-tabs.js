'use strict';

let tabs;
let currentTab;
let tabNavItems = [];


function hideTab(tab) {
    tab.style.display = 'none';
}

function showTab(tab) {
    tab.style.display = 'block';
}

function tabNavItemClickHandle(e) {
    let prevIndex = currentTab;
    let index = 0;
    for (let i = 0; i < tabNavItems.length; i++) {
        if (tabNavItems[index] === e.target) break;
        index++;
    }
    if (prevIndex === index) return;
    currentTab = index;

    tabNavItems[prevIndex].classList.remove('selected-price-list-nav-item');
    tabNavItems[index].classList.add('selected-price-list-nav-item');

    hideTab(tabs[prevIndex]);
    showTab(tabs[index]);
}

function initiatePriceListTabs() {
    tabNavItems = document.getElementsByClassName('price-list-nav-item');
    tabs = document.getElementsByClassName('price-list-tab');
    currentTab = 0;

    for (let i = 0; i < tabs.length; i++) {
        hideTab(tabs[i]);
        tabNavItems[i].onclick = tabNavItemClickHandle;
    }

    tabNavItems[currentTab].classList.add('selected-price-list-nav-item');
    showTab(tabs[currentTab]);
}

window.addEventListener('load', initiatePriceListTabs);
