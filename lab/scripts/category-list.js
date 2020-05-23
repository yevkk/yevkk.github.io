'use strict';

let categories = document.getElementsByClassName('category-title');

function showCategory(categoryTitle) {
    let subcategoryList = categoryTitle.nextElementSibling;
    for (let item of categories) {
        hideCategory(item);
    }

    subcategoryList.style.maxHeight = subcategoryList.scrollHeight + 'px';
}

function hideCategory(categoryTitle) {
    let currentCategoryTitle = document.getElementsByClassName('current-category')[0];
    if (currentCategoryTitle === categoryTitle) return;
    categoryTitle.nextElementSibling.style.maxHeight = null;
}


function categoryClickHandle() {

    if (this.nextElementSibling.style.maxHeight) {
        hideCategory(this);
    } else {
        showCategory(this);
    }
}

function initiateCollapsibleCategories() {
    for (let i = 0; i < categories.length; i++) {
        categories[i].onclick = categoryClickHandle;
    }

    let currentCategoryTitle = document.getElementsByClassName('current-category')[0];
    if (!currentCategoryTitle) return;
    showCategory(currentCategoryTitle);
}

addEventListener('load', initiateCollapsibleCategories);