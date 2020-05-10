'use strict';

let countries = [];
let currentCountry = -1;
let localTotalCost = 0;
let globalTotalCost = 0;

function displayCountry(country) {
    document.getElementById('country-info').style.display = 'flex';

    document.getElementById('country-name').innerText = country.name;
    document.getElementById('country-flag').src = country.flagFile;
    document.getElementById('country-population').value = country.population;
    document.getElementById('country-capital').value = country.capital;

    let attractionsContainer = document.getElementById('country-attractions');
    attractionsContainer.innerHTML = '';
    let counter = 0;
    localTotalCost = 0;
    for (let item of country.attractions) {
        attractionsContainer.insertAdjacentHTML('beforeend',
            `<div class="attraction ${item.selected ? 'chosen' : ''}" data-index="${counter}">
                       <div class="attraction-checkbox-holder">
                           <input type="checkbox" id="attraction-checkbox-${counter}" ${item.selected ? 'checked' : ''} onclick="selectAttraction(this)">
                           <br>
                           <label for="attraction-checkbox-${counter}">Хочу<br>відвідати</label>
                       </div>
                       <div class="attraction-info-holder">
                           <p class="attraction-name">${item.name}</p>
                           <p class="attraction-description">${item.description}</p>
                           <div class="attraction-price-holder">
                               <label for="attraction-price-${counter}">Вартість відвідування: </label>
                               <output id="attraction-price-${counter}">${item.price}</output>
                           </div>
                       </div>
                       <div class="attraction-photo-holder">
                           <div class="attraction-photo" style="background-image: url('${item.photoFile}')">
                       </div>
                   </div>`
        );
        counter++;
        localTotalCost += item.selected ? item.price : 0;
    }
    document.getElementById('local-total-cost').value = `${localTotalCost} ₴`;
}

function selectAttraction(checkbox) {
    let attractionElement = checkbox.parentElement.parentElement;
    attractionElement.classList.toggle('chosen');

    let attraction =  countries[currentCountry].attractions[attractionElement.dataset.index];
    attraction.selected = checkbox.checked;

    if (checkbox.checked) {
        localTotalCost += attraction.price;
        globalTotalCost += attraction.price;
    } else {
        localTotalCost -= attraction.price;
        globalTotalCost -= attraction.price;
    }

    document.getElementById('local-total-cost').value = `${localTotalCost} ₴`;
    document.getElementById('global-total-cost').value = `${globalTotalCost} ₴`;
}

addEventListener('DOMContentLoaded', () => {
        let dataFile = new XMLHttpRequest();
        dataFile.open("GET", 'data/data.json', false);
        dataFile.onreadystatechange = function () {
            if (dataFile.readyState === 4) {
                if (dataFile.status === 200 || dataFile.status === 0) {
                    countries = JSON.parse(dataFile.responseText);
                }
            }
        };
        dataFile.send(null);

        let select = document.getElementById('country-select');
        for (let i = 0; i < countries.length; i++) {
            select.insertAdjacentHTML("beforeend", `<option value=${i}>${countries[i].name}</option>`);
        }

        select.addEventListener('change', () => {
                currentCountry = select.options[select.selectedIndex].value;
                displayCountry(countries[currentCountry]);
            }
        );
    }
);