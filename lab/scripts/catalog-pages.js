'use strict';

let pages;
let pagesHolder;
let currentPage;
let navItems = [];

function fillPagesGaps() {
    let holderWidth = parseInt(getComputedStyle(pagesHolder).width);
    let cardWidth = 250;
    let rowSize = Math.trunc(holderWidth / cardWidth);

    for (let page of pages) {
        let cardsCount = page.childElementCount;
        let gapsCount = (rowSize - (cardsCount % rowSize)) % rowSize;

        for (let i = 0; i < gapsCount; i++) {
            let gap = document.createElement('div');
            gap.classList.add('product-card');
            gap.classList.add('product-card-gap');
            gap.style.opacity = '0';
            page.append(gap);
        }
    }
}

function hidePage(page) {
    page.style.display = '';
}

function showPage(page) {
    page.style.display = 'flex';
}

function navItemClickHandle(e) {
    let prevIndex = currentPage;
    let index = navItems.findIndex((item) => item === e.target);
    if (prevIndex === index) return;
    currentPage = index;

    navItems[prevIndex].classList.remove('current-page-nav-item');
    navItems[index].classList.add('current-page-nav-item');

    hidePage(pages[prevIndex]);
    showPage(pages[index]);

    let mainSection = document.getElementById('main-section');
    if (mainSection.offsetTop < window.pageYOffset){
        pages[index].scrollIntoView();}
}

function initiateCatalogue() {
    pages = document.getElementsByClassName('catalog-page');
    pagesHolder = document.getElementById('catalog-pages-holder');
    currentPage = 0;

    let navItemsListElement = document.getElementById('catalog-pages-nav');
    for (let i = 0; i < pages.length; i++) {

        let navItem = document.createElement('li');
        navItem.innerText = `${i + 1}`;
        navItem.classList.add('catalog-pages-nav-item');
        navItem.onclick = navItemClickHandle;
        navItemsListElement.append(navItem);
        navItems.push(navItem);
    }
    navItems[currentPage].classList.add('current-page-nav-item');
    showPage(pages[currentPage]);

    fillPagesGaps();
}
