let books;
let deliveryTypes = {
    toPostOffice: (cost) => {
        return cost * 1.05
    },
    toHome: (cost) => {
        return cost * 1.15
    },
    withPackaging: (cost) => {
        return cost * 1.1
    }
};
let orders = []

function Order(bookIndex, quantity, deliveryType, packaging) {
    let rawCost = books[bookIndex].cost * quantity;
    let totalCost = deliveryTypes[deliveryType](rawCost);
    if (packaging) totalCost = deliveryTypes['withPackaging'](totalCost);

    return {
        bookIndex,
        quantity,
        deliveryType,
        packaging,
        rawCost,
        totalCost,
        increaseQuantity: function (increment) {
            this.rawCost += books[this.bookIndex].cost * increment;
            this.totalCost = deliveryTypes[this.deliveryType](this.rawCost);
            if (this.packaging) this.totalCost = deliveryTypes['withPackaging'](this.totalCost);
        }
    };
}

function displayBookCost() {
    let bookIndex = document.getElementById('book-select').value;
    let quantity = document.getElementById('book-quantity').value;
    let deliveryType = document.querySelector('input[name="delivery-type"]:checked').value;
    let packaging = document.getElementById('book-packaging').checked;

    let cost = deliveryTypes[deliveryType](books[bookIndex].cost * quantity);
    if (packaging) cost = deliveryTypes['withPackaging'](cost);

    document.getElementById('book-cost').value = cost.toFixed(2);
}

function displayTotalCost() {
    let totalCost = 0;
    for (let i = 0; i < orders.length; i++)
        totalCost += orders[i].totalCost;

    document.getElementById('total-cost').value = totalCost.toFixed(2);
}

function resetInput() {
    document.getElementById('book-select').firstElementChild.selected = true;
    document.getElementById('book-quantity').value = 0;
    document.querySelectorAll('input[name="delivery-type"]')[0].checked = true;
    document.getElementById('book-packaging').checked = false;
    document.getElementById('book-cost').value = 0;

    document.getElementById('total-cost').value = '';
}

function showBasket() {
    let nameField = document.getElementById('client-name');
    let addressField = document.getElementById('client-address');
    document.getElementById('client-info').innerHTML = `<p>Ім\'я замовника: ${nameField.value}</p> <p>Адреса доставки: ${addressField.value}</p>`;

    let tableContent =
        `<tr>
            <th style="width: 19%">Назва книги</th>
            <th style="width: 19%">Автори</th>
            <th style="width: 8%">Ціна</th>
            <th style="width: 8%">Кількість</th>
            <th style="width: 8%">Вартість</th>
            <th style="width: 15%">Спосіб доставки</th>
            <th style="width: 15%">У святковій упаковці</th>
            <th style="width: 8%">Кінцева вартість</th>
        </tr>`;

    let rawCostSum = 0;
    let totalCostSum = 0;
    let quantitySum = 0;

    for (let item of orders) {
        tableContent +=
            `<tr>
            <td>${books[item.bookIndex].name}</td>
            <td>${books[item.bookIndex].authors}</td>
            <td>${books[item.bookIndex].cost.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${item.rawCost.toFixed(2)}</td>
            <td>${item.deliveryType === 'toPostOffice' ? 'Поштою' : 'Доставка до дому'}</td>
            <td>${item.packaging ? 'так' : 'ні'}</td>
            <td>${item.totalCost.toFixed(2)}</td>
        </tr>`;

        rawCostSum += item.rawCost;
        totalCostSum += item.totalCost;
        quantitySum += +item.quantity;
    }


    tableContent +=
        `<tr style="border-top: 2px dashed black; margin: 15px 2px">
            <th>Загалом</th>
            <td></td>
            <td></td>
            <td>${quantitySum}</td>
            <td>${rawCostSum.toFixed(2)}</td>
            <td></td>
            <td></td>
            <td>${totalCostSum.toFixed(2)}</td>
        </tr>`;

    document.getElementById('basket-table').innerHTML = tableContent;
    document.getElementById('basket').hidden = false;
}

document.addEventListener('DOMContentLoaded', function () {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", 'scripts/books.json', false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    books = JSON.parse(rawFile.responseText);
                }
            }
        };
        rawFile.send(null);

        for (let item of books) {
            item[Symbol.toPrimitive] = function (hint) {
                return `${this.name} - ${this.authors} - ${this.cost}`;
            }
        }

        let select = document.getElementById('book-select');
        for (let i = 0; i < books.length; i++) {
            select.insertAdjacentHTML("beforeend", `<option value=${i}>${books[i][Symbol.toPrimitive]()}</option>`);
        }

        document.getElementById('book-quantity').addEventListener('input', function () {
                displayBookCost();
            }
        );

        document.getElementById('book-quantity').addEventListener('blur', function () {
                let bookIndex = document.getElementById('book-select').value;
                let quantity = document.getElementById('book-quantity').value;
                let deliveryType = document.querySelector('input[name="delivery-type"]:checked').value;
                let packaging = document.getElementById('book-packaging').checked;

                if (+quantity === 0) return;

                for (let order of orders) {
                    if (bookIndex === order.bookIndex && deliveryType === order.deliveryType && packaging === order.packaging) {
                        order.increaseQuantity(quantity);
                        alert('У кошику наявна аналогічна позиція. Обрані книги додані до створеної раніше позиції');
                        resetInput();
                        return;
                    }
                }

                orders.push(Order(bookIndex, quantity, deliveryType, packaging));

                let counter = document.getElementById('basket-fill');
                counter.innerHTML = `${orders.length}`;
                counter.hidden = false;

                resetInput();
            }
        );

        document.getElementById('calc-total-cost-btn').addEventListener('click', displayTotalCost);

        document.getElementById('clear-basket-btn').addEventListener('click', function () {
                document.getElementById('basket-table').innerHTML = '';
                document.getElementById('basket').hidden = true;

                let counter = document.getElementById('basket-fill');
                counter.innerHTML = '';
                counter.hidden = true;

                orders = [];
            }
        );

        document.getElementById('show-basket-btn').addEventListener('click', function () {
                let nameField = document.getElementById('client-name');
                let addressField = document.getElementById('client-address');

                if (nameField.value !== '' && addressField.value !== '') {
                    showBasket();
                } else {
                    if (nameField.value === '') {
                        nameField.style.backgroundColor = '#ffd4e3';
                    }
                    if (addressField.value === '') {
                        addressField.style.backgroundColor = '#ffd4e3';
                    }
                }
            }
        );

        document.getElementById('client-name').addEventListener('input', function () {
                this.style.backgroundColor = 'initial';
            }
        );

        document.getElementById('client-address').addEventListener('input', function () {
                this.style.backgroundColor = 'initial';
            }
        );

        document.getElementById('reset-btn').addEventListener('click', function () {
                resetInput();
                document.getElementById('client-name').value = '';
                document.getElementById('client-address').value = '';
            }
        );
    }
);
