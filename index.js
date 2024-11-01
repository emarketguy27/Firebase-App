import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://testground-68a87-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listItemsInDB = ref(database, "items");

onValue(listItemsInDB, function (snapshot) {
  if (snapshot.exists()) {
    clearListEl();
    var value = snapshot.val();

    let itemsArray = Object.entries(value);

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItems = itemsArray[i];

      let currentItemID = currentItems[0];

      let currentItemValue = currentItems[1];

      appendListToItemListEl(currentItems);
    }
  } else {
    shoppingListEl.innerHTML = "No Items here... Yet!";
  }
});

const listEl = document.getElementsByTagName("ul");
const shoppingListEl = document.getElementById("shopping-list");
const inputEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", () => {
  let inputValue = inputEl.value;
  push(listItemsInDB, inputValue);
  //   appendList(inputValue);
  clearInputFieldEl();
});

function clearInputFieldEl() {
  inputEl.value = "";
}
function clearListEl() {
  shoppingListEl.innerHTML = "";
}
function appendListToItemListEl(item) {
  //   shoppingListEl.innerHTML += `<li>${currentItems}</li>`;
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", () => {
    let exactLocationOfItemInDB = ref(database, `items/${itemID}`);
    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newEl);
}

const calcBtn = document.querySelector('#calc-btn');
calcBtn.addEventListener("click", toggleCalc);
const calculator = document.querySelector('#calc');

function toggleCalc() {
  calculator.classList.toggle("visible");
  calcBtn.classList.toggle("active");
  calculator.classList.toggle("hidden");
};