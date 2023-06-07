const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {

    e.preventDefault();

    const newItem = itemInput.value;

    if (newItem === '') {
        alert('please add an item');
        return;
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);
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

// Event Listeners 
itemForm.addEventListener('submit',addItem);