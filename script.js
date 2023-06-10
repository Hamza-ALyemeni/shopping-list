const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDom(item));
}

function onAddItemSubmit(e) {

    e.preventDefault();

    const newItem = itemInput.value;

    if (newItem === '') {
        alert('please add an item');
        return;
    }

    //create item dom
    addItemToDom(newItem);

    // Add item to local storage
    addItemToStorage(newItem);

    itemInput.value = '';
}

function addItemToDom(item){
    // Create List Item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add Li to the DOM
    itemList.appendChild(li);

    checkUI();
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const Icon = createIcon('fa-solid fa-xmark');
    button.appendChild(Icon);
    return button;
}

function createIcon(classes) {
    const Icon = document.createElement('i');
    Icon.className = classes;
    return Icon;
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure ?')) {     
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    } 
}

function removeAll(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    checkUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item)=>{
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    });
}

function checkUI(){
    const items = itemList.querySelectorAll('li');
    if (items.length == 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}
// Event Listeners 
itemForm.addEventListener('submit',onAddItemSubmit);
itemList.addEventListener('click',removeItem);
clearBtn.addEventListener('click',removeAll);
itemFilter.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',displayItems);

checkUI();