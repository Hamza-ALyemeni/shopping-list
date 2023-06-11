const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDom(item));
    checkUI();
}

function onAddItemSubmit(e) {

    e.preventDefault();

    const newItem = itemInput.value;

    if (newItem === '') {
        alert('please add an item');
        return;
    }

    // Check For Edit Mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }else{
        if (checkIfItemExists(newItem)) {
            alert('that item already exists!');
            return;
        }
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

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
        checkUI();
    }else{
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    isEditMode = true;
    itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#22BB22';
    itemInput.value = item.textContent;
}

function removeItem(item) {
    if (confirm('Are You Sure ?')) {
    // Remove From The DOM
        item.remove();
    // Remove From Local Storage
        removeItemFromStorage(item.textContent);
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    // filter out items to be removed 
    itemsFromStorage = itemsFromStorage.filter((i) => i != item);
    // Re-set to localstorage 
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
function removeAll(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // Clear From Local Storage
    localStorage.removeItem('items');

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
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if (items.length == 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}
// Event Listeners 
itemForm.addEventListener('submit',onAddItemSubmit);
itemList.addEventListener('click',onClickItem);
clearBtn.addEventListener('click',removeAll);
itemFilter.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',displayItems);

checkUI();