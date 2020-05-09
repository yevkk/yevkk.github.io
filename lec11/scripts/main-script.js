'use strict';

let countries = [];
let currentCountry = 0;

function displayCountry(country) {
    document.getElementById('country-info').style.display = 'flex';

    document.getElementById('country-name').innerText = country.name;
    document.getElementById('country-flag').src = country.flagFile;
    document.getElementById('country-population').value = country.population;
    document.getElementById('country-capital').value = country.population;

    let attractionsContainer = document.getElementById('country-attractions');
    attractionsContainer.innerHTML = '';
    let counter = 0;
    for (let item of country.attractions) {
        attractionsContainer.insertAdjacentHTML('beforeend',
            `<div class="attraction ${item.selected ? 'chosen' : ''}">
                       <div class="attraction-checkbox-holder">
                           <input type="checkbox" id="attraction-checkbox-${counter}" ${item.selected ? 'checked' : ''}>
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
        counter++
    }

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
                displayCountry(countries[select.options[select.selectedIndex].value]);
            }
        );
    }
);