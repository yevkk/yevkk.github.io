'use strict';

let slides;
let currentSlide;
let sliderSelectorList = [];
let timer;

function showSlide(index) {
    clearTimeout(timer);
    let previousSlide = currentSlide;
    currentSlide = index;

    sliderSelectorList[index].classList.add('selected');
    sliderSelectorList[previousSlide].classList.remove('selected');

    slides[index].style.opacity = '1';
    slides[previousSlide].style.opacity = '0';

    timer = setTimeout(nextSlide, 5000); //taking in account transition duration - 1s;
}

function nextSlide() {
    showSlide((currentSlide + 1 === slides.length) ? 0 : currentSlide + 1);
}

function previousSlide() {
    showSlide((currentSlide === 0) ? slides.length - 1 : currentSlide - 1);
}

function nextBtnClickHandle() {
    clearTimeout(timer);
    nextSlide();
}

function prevBtnClickHandle() {
    clearTimeout(timer);
    previousSlide();
}

function selectorClickHandle(e) {
    let index = sliderSelectorList.findIndex((item) => item === e.target);
    if (index === currentSlide) return;
    clearTimeout(timer);
    showSlide(index);
}

function initiateSlider() {
    slides = document.getElementsByClassName('photo-slide');
    currentSlide = slides.length - 1;

    let slideSelectorsHolder = document.getElementById('slide-selectors-holder');
    for (let i = 0; i < slides.length; i++) {
        let newSelector = document.createElement('div');
        newSelector.onclick = selectorClickHandle;
        newSelector.className = 'photo-selection-item';
        slideSelectorsHolder.append(newSelector);
        sliderSelectorList.push(newSelector);
    }

    showSlide(0);

    document.getElementById('next-button').onclick = nextBtnClickHandle;
    document.getElementById('prev-button').onclick = prevBtnClickHandle;
}

window.addEventListener('load', initiateSlider);
